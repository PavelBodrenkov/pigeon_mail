const Router = require('express');
const router = new Router();
const dialogsController = require('../controllers/dialogs.controller');

router.post('/', dialogsController.createDialog)
router.get('/', dialogsController.getDialogs)
// router.get('/user/:id', usersController.getOneUser)
// router.put('/user', usersController.updateUser)
// router.delete('/user', usersController.deleteUser)

module.exports = router