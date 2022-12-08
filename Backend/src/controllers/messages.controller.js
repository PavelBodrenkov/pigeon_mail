const messagesService = require('../services/message.service')

class MessagesController {

    async getMessagesByDialog(req, res) {
        try {
            const messages = await messagesService.getMessagesByDialog(req)
            return  res.json(messages)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new MessagesController()