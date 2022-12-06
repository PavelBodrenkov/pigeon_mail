const jwt = require('jsonwebtoken');
const UnauthorizedError = require("../errors/authorized-err");
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
    const {authorization} = req.headers;
    console.log('authorization', authorization)
    if(!authorization || !authorization.startsWith('Bearer ')) {
        throw new UnauthorizedError('Необходима авторизация')
    }

    const token = authorization.replace('Bearer ', '');

    let payload;

    try {
        payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret')
    } catch (err) {
        throw new UnauthorizedError(err)
    }

    req.user = payload
    return next();
}