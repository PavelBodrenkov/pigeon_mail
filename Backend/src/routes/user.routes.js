const Router = require('express');
const router = new Router();
const usersController = require('./../controllers/users.controller');


router.post('/user', usersController.createUser)
router.get('/user', usersController.getUsers)
router.get('/user/:id', usersController.getOneUser)
router.put('/user', usersController.updateUser)
router.delete('/user', usersController.deleteUser)

module.exports = router