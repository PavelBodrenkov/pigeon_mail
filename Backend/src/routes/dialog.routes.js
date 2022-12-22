const Router = require('express');
const router = new Router();
const dialogsController = require('../controllers/dialogs.controller');

module.exports = (io) => {
    const DialContr = new dialogsController(io)
    router.post('/', DialContr.createDialog)
    router.get('/', DialContr.getDialogs)
// router.get('/user/:id', usersController.getOneUser)
// router.put('/user', usersController.updateUser)
// router.delete('/user', usersController.deleteUser
    return router
}