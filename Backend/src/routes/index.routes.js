const Router = require('express');
const router = new Router();
const { celebrate, Joi } = require('celebrate');
const {requestLogger, errorLogger}  = require('../middlewares/logger');
const userRouter = require('./user.routes');
const dialogRouter = require('./dialog.routes');
const usersController = require('./../controllers/users.controller');
const auth = require('../middlewares/auth');
const errorRouter = require('./error');

router.use(requestLogger);

router.post('/signin', celebrate({
    body: Joi.object().keys({
        email:Joi.string().required().email(),
        password: Joi.string().required()
    }),
}), usersController.login)

router.post('/signup',celebrate({
    body: Joi.object().keys({
        fullname:Joi.string().max(30),
        email:Joi.string().required().email(),
        password:Joi.string().required().min(6)
    }),
}), usersController.registration)

router.get('/activate/:link')
router.use(auth);
router.use(errorLogger);

router.use('/user', userRouter);
router.use('/dialog', dialogRouter);
router.use('/', errorRouter);


module.exports = router;