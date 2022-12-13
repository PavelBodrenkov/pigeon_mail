const ws = require('ws')
const express = require('express')
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser')
const indexRouter = require('./routes/index.routes')
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config()
const PORT = process.env.PORT || 8080;
const errorMiddleware = require('./middlewares/error.middleware');

const app = express()
const WSServer = require('express-ws')(app)


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:['http://localhost:3000', 'http://localhost:3001']
}));

app.use('/api', indexRouter);

app.ws('/test', (ws, req) => {
    console.log('req', req)
    console.log('ПОДКЛЮЧЕНИЕ УСТАНОВЛЕНО')
    ws.send('Ты успешно подключился')
    ws.on('message', (msg) => {
        console.log('msg', msg)
    })
})

app.use(errorMiddleware);
app.use(errors());

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))