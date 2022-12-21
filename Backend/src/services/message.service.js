const db = require('../db')

class MessageService {

    //Получение сообщений пользователя
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
                console.log('нет диалогов')
            } else {
                const sql = `SELECT M.id, M.date, M.message, M.sender, U.avatar, U.fullname, M.readed
                             FROM messages as M
                                      LEFT JOIN users as U ON (U.id = sender)
                             WHERE M.conv_id = ${row_conversation.rows[0].id}
                               AND CASE
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

    //Создание сообщения
    async createMessage(req) {
        const {conv_id, message, partner, id} = req
        // const {id} = req.user
        //Создаем сообщение
        const messageSQL = `INSERT INTO messages (conv_id, sender, addressee, readed, sender_delete,
                                                  addressee_delete, message, date)
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`
        const row_messages = await db.query(messageSQL, [conv_id, id, partner, 0, 0, 0, message, new Date()])

        //Получаем нужное сообщение
        const returnMessage = `SELECT M.id, M.date, M.message, M.sender, U.avatar, U.fullname
                               FROM messages as M
                                        LEFT JOIN users as U ON (U.id = M.sender)
                               WHERE M.id = ${row_messages.rows[0].id}`
        const result = await db.query(returnMessage)

        //обновляем таблицу с диалогами
        const updateConversationSQL = `
            UPDATE conversation
            SET last_message_id = ${row_messages.rows[0].id},
                sender          = ${id},
                unread          = (SELECT COUNT(*)
                                   FROM messages as M
                                   WHERE M.conv_id = ${conv_id}
                                     AND M.readed = 0
                                     AND M.sender = ${id})
            WHERE id = ${conv_id} RETURNING *
        `
        await db.query(updateConversationSQL);
        return result.rows[0]
    }

    async deleteMessage(req) {
        const {id} = req.user
        const {message_id} = req.body

        //Проверяем существование сообщения
        const sql = `SELECT id
                     FROM messages
                     WHERE id = ${message_id}
                       AND (sender = ${id} OR addressee = ${id})`
        const find_message = await db.query(sql);
        if (find_message.rows.length === 0) {
            console.log('Сообщение не найдено')
        } else {
            const sql = `UPDATE messages
                         SET sender_delete    =
                                 CASE sender
                                     WHEN ${id}
                                         THEN 1
                                     ELSE
                                         sender_delete
                                     END,
                             addressee_delete =
                                 CASE addressee
                                     WHEN ${id}
                                         THEN 1
                                     ELSE
                                         addressee_delete
                                     END
                         WHERE id = ${message_id} RETURNING *`
            const result = await db.query(sql)
                //Получаем последнее сообщение в диалоге
            const lastMessage = await db.query(`
                SELECT id, conv_id
                FROM messages
                WHERE (sender = ${id} OR addressee = ${id})
                  AND sender_delete = 0
                  AND addressee_delete = 0
                AND conv_id = ${result.rows[0].conv_id}
                ORDER BY ID DESC LIMIT 1`)
                //Обновляем последнее сообщение в диалоге
            await db.query(`UPDATE conversation
                            SET last_message_id = ${lastMessage.rows[0].id}
                            WHERE id = ${lastMessage.rows[0].conv_id}`)

            return result.rows[0]

        }
    }
}

module.exports = new MessageService();