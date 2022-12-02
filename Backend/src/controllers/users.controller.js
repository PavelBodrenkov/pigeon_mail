const db = require('../db');

class UsersController {
    async createUser(req, res) {
        const {email, avatar, fullname, password, is_admin}  = req.body
        const sql = `INSERT INTO users (email, avatar, fullname, password, is_admin, created_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`
        const user = await db.query(sql, [email, avatar, fullname, password, 0, new Date()])
        res.json(user)
    }

    async getUsers(req, res) {
        const sql = `SELECT * FROM users`
        const users = await db.query(sql)
        res.json(users)
    }

    async getOneUser(req, res) {

    }

    async updateUser(req, res) {

    }

    async deleteUser(req, res) {

    }
}

module.exports = new UsersController()