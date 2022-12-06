const Router = require('express');
const router = new Router();
const NotFoundError = require("../errors/not-found-err");

router.all('*', (req, res) => {
    throw new NotFoundError('Запрашиваемый ресурс не найден')
})

module.exports = router;