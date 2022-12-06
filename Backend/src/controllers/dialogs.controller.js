const db = require('../db');

class DialogsController {
    async createDialog(req, res) {
        const {owner, partner}  = req.body
        const sql = `INSERT INTO dialogs (owner, partner, created_at) VALUES($1, $2, $3) RETURNING *`
        const dialogs = await db.query(sql, [owner, partner, new Date()])
        res.json(dialogs)
    }

    async getDialogs(req, res) {
        const sql = `SELECT * FROM dialogs WHERE owner = ?`
        const users = await db.query(sql, [1])
        res.json(users)
    }
}

module.exports = new DialogsController()