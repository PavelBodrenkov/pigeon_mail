const jwt = require('jsonwebtoken');
const UnauthorizedError = require("../errors/authorized-err");
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization || !authorization.startsWith('Bearer ')) {
        throw new UnauthorizedError('Необходима авторизация')
    }

    const token = authorization.replace('Bearer ', '');

    let payload;

    try {
        payload = jwt.verify(token, 'jwt-secret-key')
    } catch (err) {
        throw new UnauthorizedError(err)
    }

    req.user = payload
    return next();
}