const Router = require('express');
const router = new Router();
const usersController = require('./../controllers/users.controller');


// router.post('/', usersController.registration)
router.get('/', usersController.getUsers)
router.get('/me', usersController.getUserMe)
router.put('/', usersController.updateUser)
router.delete('/', usersController.deleteUser)

module.exports = router
