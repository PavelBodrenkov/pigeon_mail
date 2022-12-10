const messagesService = require('../services/message.service')

class MessagesController {

    async getMessagesByDialog(req, res) {
        try {
            const messages = await messagesService.getMessagesByDialog(req)
            return  res.json(messages)
        } catch (e) {
            console.log('Ошибка сообщения',e)
        }
    }

    async createMessage(req, res) {
        try {
            const messages = await messagesService.createMessage(req)
            return  res.json(messages)
        } catch (e) {
            console.log('Ошибка сообщения',e)
        }
    }

    async deleteMessage(req, res) {
        try {
            const messages = await messagesService.deleteMessage(req)
            return res.json(messages)
        } catch(e) {
            console.log('Ошибка сообщения',e)
        }
    }
}

module.exports = new MessagesController()