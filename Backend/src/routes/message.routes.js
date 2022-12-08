const Router = require('express');
const router = new Router();
const messageController = require("./../controllers/messages.controller");


router.get('/', messageController.getMessagesByDialog)

module.exports = router