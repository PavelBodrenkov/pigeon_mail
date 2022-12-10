const Router = require('express');
const router = new Router();
const messageController = require("./../controllers/messages.controller");


router.get('/:id', messageController.getMessagesByDialog)
router.post('/', messageController.createMessage)
router.put('/', messageController.deleteMessage)

module.exports = router