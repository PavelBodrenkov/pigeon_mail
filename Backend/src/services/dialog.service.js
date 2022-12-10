const db = require('../db');

class DialogService {

    async getAllDialogsByUser(req) {
        const userId = req.user.id
        const sql =
            `
            SELECT U.id as userId, U.fullname, U.avatar, C.id as convId, C.sender, C.unread, M.message, M.date
            FROM users as U, conversation as C
            LEFT JOIN messages as M ON(C.last_message_id = M.id)
            WHERE (C.first = ${userId} OR C.second = ${userId})
            AND CASE
                WHEN C.first = ${userId}
                    THEN C.second = U.id AND C.first_delete = 0
                WHEN C.second = ${userId}
                    THEN C.first = U.id AND C.second_delete = 0
                END 
            ORDER BY C.unread DESC
            `;
        const allDialog = await db.query(sql)
        return allDialog.rows
    }


    async createDialog(req) {
        const {owner, partner} = req.body
        const message = 'Hello My Friend three';
        //Проверяем, не отправляем ли мы диалог сами себе
        if (owner !== partner) {
            //Проверяем есть ли уже диалог
            const sql = `
                SELECT id
                FROM conversation
                WHERE (first = ${owner} AND second = ${partner})
                   OR (first = ${partner} AND second = ${owner})
            `
            const row_conversation = await db.query(sql);

            let last_conversation_id = 0 //

                //Если диалога нет, то создаем
            if (row_conversation.rows.length === 0) {
                const sql =
                    `INSERT INTO conversation (first, second, last_message_id, sender, first_delete, second_delete,
                                               unread)
                     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
                const dialog = await db.query(sql, [owner, partner, 0, owner, 0, 0, 0])
                last_conversation_id = dialog.rows[0].id
            } else {
                last_conversation_id = row_conversation.rows[0].id
            }

            //Создаем сообщение
            const messageSQL = `INSERT INTO messages (conv_id, sender, addressee, readed, sender_delete,
                                                      addressee_delete, message, date)
                                VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`
            const row_messages = await db.query(messageSQL, [last_conversation_id, owner, partner, 0, 0, 0, message, new Date()])

            //обновляем таблицу с диалогами
            const updateConversationSQL = `
                UPDATE conversation
                SET last_message_id = ${row_messages.rows[0].id},
                    sender          = ${owner},
                    unread          = (SELECT COUNT(*)
                                       FROM messages as M
                                       WHERE M.conv_id = ${last_conversation_id}
                                         AND M.readed = 0
                                         AND M.sender = ${owner})
                WHERE id = ${last_conversation_id} RETURNING *
            `
            const result = await db.query(updateConversationSQL);
            return result.rows[0]
        }
    }

}

module.exports = new DialogService();