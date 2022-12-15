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
const messageController = require("./controllers/messages.controller");

const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:['http://localhost:3000', 'http://localhost:3001']
}));

app.use('/api', indexRouter);

const users = {}
app.ws('/', (ws, req) => {

    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        console.log('msg', msg)

        switch (msg.method) {
            case "connection":
                console.log('ПОДКЛЮЧЕНИЕ УСТАНОВЛЕНО!')
                connectionHandler(ws, msg)
                break
            case "sendMessage":
                connectRoom(ws, msg)
                break
        }
    })

    // ws.on('message', (msg) => {
    //     msg = JSON.parse(msg)
    //     let userId = msg.userId; // GET USER ID
    //     if (!users[userId]) users[userId] = [];
    //     users[userId].push(ws.id);
    //     switch (msg.method) {
    //         case "connection":
    //             // connectionHandler(ws, msg)
    //             break
    //     }
    //
    //     // let tmp = messageController.createMessage(JSON.parse(msg))
    //     // ws.send(JSON.stringify(tmp))
    // })
})

app.use(errorMiddleware);
app.use(errors());

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))

const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    broadcastConnection(ws, msg)
}

const connectRoom = (ws, msg) => {
    ws.room = msg.room
    broadcastConnection(ws, msg)
}

const broadcastConnection = (ws, msg) => {
  aWss.clients.forEach(client => {
      console.log('client.room', client.room)
      console.log('client.id', client.id)

       if(client.id === msg.id) {
          client.send(JSON.stringify(msg))
      } else if (client.room === msg.room) {
           client.send(JSON.stringify(msg))
       }
  })
}