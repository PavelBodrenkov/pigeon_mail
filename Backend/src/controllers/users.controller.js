const db = require('../db');
const UserService = require('../services/user.service');

class UsersController {

    async registration(req, res, next) {
        try {
            const user = await UserService.createUser(req)
            res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const user = await UserService.loginUser(req)
            res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(user)
        } catch (e) {
           next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await UserService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async refreshToken(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch(e) {
            next(e)
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await UserService.getUsers()
            return res.json(users)
        } catch (e) {
            next(e)
        }
    }

    async getUserMe(req, res, next) {
        try {
            const user = await UserService.getUserMe(req)
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async updateUser(req, res, next) {
        try {
            const user = await UserService.updateUser(req)
            return res.json(user.rows[0])
        } catch (e) {
            next(e)
        }
    }

    async deleteUser(req, res, next) {
        try {
            await UserService.deleteUser(req)
            return res.json('Пользователь удален')
        } catch (e) {
            next(e)
        }

    }
}

module.exports = new UsersController()