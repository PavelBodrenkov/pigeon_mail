const db = require('../db');
const UserService = require('../services/user.service');

class UsersController {

    async registration(req, res) {
        try {
            const user = await UserService.createUser(req)
            res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(user)
        } catch (e) {
            console.log('error', e)
        }
    }

    async login(req, res) {
        try {
            const user = await UserService.loginUser(req)
            res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(user)
        } catch (e) {
            console.log('error', e)
        }
    }

    async logout(req, res) {
        try {
            const {refreshToken} = req.cookies;
            const token = await UserService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            console.log('error', e)
        }
    }

    async refreshToken(req, res) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        } catch(e) {
            console.log('error', e)
        }
    }

    async getUsers(req, res) {
        try {
            const users = await UserService.getUsers()
            return res.json(users)
        } catch (e) {
            console.log(e)
        }
    }

    async getUserMe(req, res) {
        try {
            const user = await UserService.getUserMe(req)
            return res.json(user)
        } catch (e) {
            console.log(e)
        }
    }

    async updateUser(req, res) {
        try {
            const user = await UserService.updateUser(req)
            return res.json(user.rows[0])
        } catch (e) {
            console.log(e)
        }
    }

    async deleteUser(req, res) {
        try {
            await UserService.deleteUser(req)
            return res.json('Пользователь удален')
        } catch (e) {
            console.log(e)
        }

    }
}

module.exports = new UsersController()