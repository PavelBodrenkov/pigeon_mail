const express = require('express')
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser')
const indexRouter = require('./routes/index.routes')
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config()
const PORT = process.env.PORT || 8080;

const app = express()
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', indexRouter);
app.use(errors());

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))