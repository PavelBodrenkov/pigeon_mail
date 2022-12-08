const db = require('../db')

class MessageService {

    async getMessagesByDialog(req) {
        const userId = req.user.id
        const partnerId = req.params.id

        if (userId !== partnerId) {
            const sql = `
                SELECT id, unread
                FROM conversation
                WHERE (first = ${userId} AND second = ${partnerId})
                   OR (first = ${partnerId} AND second = ${userId})`
            const row_conversation = await db.query(sql)
            if (row_conversation.rows.length === 0) {
                return row_conversation.rows
            } else {
                const sql = `SELECT M.id, M.date, M.message, M.sender, U.avatar, U.fullname
                             FROM messages as M
                            LEFT JOIN users as U ON (U.id = sender)
                             WHERE
                                 M.conv_id = ${row_conversation.rows[0].id} 
                               AND
                                 CASE
                                 WHEN M.sender = ${userId}
                                 THEN M.sender_delete = 0
                                 WHEN M.addressee = ${userId}
                                 THEN M.addressee_delete = 0
                END
                ORDER BY id ASC`
                const result = await db.query(sql)

                if (row_conversation.rows[0]?.unread !== 0) {
                    await db.query(`UPDATE messages
                                    SET readed = 1
                                    WHERE conv_id = ${row_conversation.rows[0].id}`)
                    await db.query(`UPDATE conversation
                                    SET unread = 0
                                    WHERE id = ${row_conversation.rows[0].id}`)
                }
                return result.rows
            }
        }
    }

}

module.exports = new MessageService();