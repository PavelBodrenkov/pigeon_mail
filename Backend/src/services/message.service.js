const db = require('../db')
class MessageService {

    async getMessagesByDialog(req) {
        console.log('req.body', req.body)
        const {partner} = req.body
        const {id} = req.user

        if(id !== partner) {
            const sql=`
                    SELECT id, unread 
                    FROM conversation 
                    WHERE
                         (first = ${id} AND second = ${partner})
                         OR
                        (first = ${partner} AND second = ${id})`
            const row_conversation = await db.query(sql)
            if(row_conversation.rows.length === 0) {
                console.log('Нет сообщений')
            } else {
                const sql = `SELECT id, date, message, sender 
                                FROM messages
                                WHERE
                                    conv_id = ${row_conversation.rows[0].id}
                                    AND 
                                    CASE
                                        WHEN sender = ${id}
                                            THEN sender_delete = 0
                                        WHEN addressee = ${id}
                                            THEN addressee_delete = 0
                                        END
                                        ORDER BY id ASC`
                const result = await db.query(sql)

                if(row_conversation.rows[0]?.unread !== 0) {
                    await db.query(`UPDATE messages SET readed = 1 WHERE conv_id = ${row_conversation.rows[0].id}`)
                    await db.query(`UPDATE conversation SET unread = 0 WHERE id = ${row_conversation.rows[0].id}`)
                }
                return result.rows
            }
        }
    }

}

module.exports = new MessageService();