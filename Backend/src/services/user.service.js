const db = require('../db');
const bcrypt = require("bcrypt")
const uuid = require('uuid');

const UnauthorizedError = require("../errors/authorized-err")
const ConflictError = require("../errors/conflict-errror");
const NotFoundError = require("../errors/not-found-err");
const mailService = require('./mail.service');
const tokenService = require('./token.service');
const UserDto = require('../dtos/user.dto')

class UserService {
    constructor() {
        this.findUserByEmail = this.findUserByEmail.bind(this)
        this.findUserById = this.findUserById.bind(this)
    }

    async findUserByEmail(email) {
        const sql = `SELECT id, email, avatar, fullname, is_admin, confirmed,confirmed_hash, activation_link, is_activation, last_seen
                     FROM users
                     WHERE email = $1
                       AND deleted_at is null`
        const user = await db.query(sql, [email])
        return user.rows[0]
    }

    async findUserById(id) {
        const sql = `SELECT id, email, avatar, fullname, is_admin, confirmed,confirmed_hash, activation_link, is_activation, last_seen
                     FROM users
                     WHERE id = $1
                       AND deleted_at is null`
        const user = await db.query(sql, [id])
        return user.rows[0]
    }

    async getUsers() {
        const sql = `SELECT *
                     FROM users
                     WHERE deleted_at is null`;
        const users = await db.query(sql)
        return users.rows
    }

    async getUserMe(req) {
        const {id} = req.user
        const user = this.findUserById(id)
        if (!user) {
            throw new NotFoundError('Пользователь не найден')
        }
        return user
    }

    async loginUser(req) {
        const {email, password} = req.body;
        console.log(email, password)
        const user = await this.findUserByEmail(email)
        if (!user) {
            throw new UnauthorizedError('Неправильная почта или пароль')
        }

        const pass = await bcrypt.compare(password.toString(), user.password)
        if (!pass) {
            throw new UnauthorizedError('Неправильная почта или пароль')
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: user
        }
    }

    async createUser(req) {
        const {email, avatar, fullname, password, is_admin = 0} = req.body
        const user = await this.findUserByEmail(email)
        if (user) {
            throw new ConflictError('Пользователь с таким email уже существует')
        }

        const hash = await bcrypt.hash(password.toString(), 10);
        const activationLink = uuid.v4();

        if (hash) {
            const sql = `INSERT INTO users (email, avatar, fullname, password, is_admin, created_at)
                         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`
            const user = await db.query(sql, [email, avatar, fullname, hash, is_admin, new Date()])
            // await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
            const userDto = new UserDto(user.rows[0]);
            const tokens = tokenService.generateToken({...userDto})
            await tokenService.saveToken(userDto.id, tokens.refreshToken);

            return {
                ...tokens,
                user: user.rows[0]
            }
        }
    }

    async logout(refreshToken) {
        return await tokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new UnauthorizedError('Необходима авторизация')
        }

        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDB) {
            throw new UnauthorizedError('Необходима авторизация')
        }

        const user = this.findUserById(userData.id)
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user
        }
    }

    async updateUser(req) {
        const {fullname, email} = req.body
        const {id} = req.user
        const user = await this.findUserByEmail(email);

        if (user) {
            throw new ConflictError('Пользователь с таким email уже существует')
        }

        const sql = 'UPDATE users SET fullname = $1, email = $2, updated_at = $3 WHERE id = $4 AND deleted_at in null RETURNING *'
        return await db.query(sql, [fullname, email, new Date(), id])
    }

    async deleteUser(req) {
        const {id} = req.user
        const user = await this.findUserById(id)

        if (!user) {
            throw new NotFoundError('Пользователь удален или не найден')
        }

        const sql = 'UPDATE users SET deleted_at = $1 WHERE id = $2'
        return await db.query(sql, [new Date(), id])
    }
}

module.exports = new UserService()