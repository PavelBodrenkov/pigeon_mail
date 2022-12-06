const db = require('../db');

class DialogService {

    async getAllDialogsByUser(req) {
        const {id} = req.user
        const sql = `SELECT * FROM dialogs WHERE owner = $1`
        const dialogs = db.query(sql, [id])
        return dialogs.rows
    }

    async createDialog(req) {
        const {owner, partner}  = req.body
        const sql = `INSERT INTO dialogs (owner, partner, created_at) VALUES($1, $2, $3) RETURNING *`
        const dialog = await db.query(sql, [owner, partner, new Date()])
        return dialog.rows[0]
    }

}

module.exports = new DialogService();