const jwt = require('jsonwebtoken');
const UnauthorizedError = require("../errors/authorized-err");
const ApiError = require("../errors/api.errors");
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization || !authorization.startsWith('Bearer ')) {
        throw ApiError.UnauthorizedError('Необходима авторизация')
    }

    const token = authorization.replace('Bearer ', '');

    let payload;

    try {
        payload = jwt.verify(token, 'jwt-secret-key')
    } catch (err) {
        throw ApiError.UnauthorizedError('Необходима авторизация')
    }

    req.user = payload
    return next();
}