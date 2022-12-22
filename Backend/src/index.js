const express = require('express')
const {errors} = require('celebrate');
const cookieParser = require('cookie-parser')
const indexRouter = require('./routes/index.routes')
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config()
const PORT = process.env.PORT || 8080;
const errorMiddleware = require('./middlewares/error.middleware');
const messageService = require('./services/message.service')
const dialogService = require('./services/dialog.service')
const http = require('http');
const {Server} = require('socket.io');
const {
    getActiveUser,
    exitRoom,
    newUser,
    getIndividualRoomUsers, onlineUser
} = require('./helpers/userHelper');
const formatMessage = require("./helpers/formatDate");

const app = express()
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', "POST"]
    }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3001']
}));

app.use('/api', indexRouter);

io.on('connection', socket => {
    // const { token } = socket.handshake.auth;

    //Онлайн
    socket.on('login', (user) => {
        io.sockets.emit('login', onlineUser(user))
    })

    //Подключение к комнате
    socket.on('joinRoom', ({username, user_id, room}) => {
        const user = newUser(socket.id, username, user_id, room);
        // socket.join(user.room);
        socket.join(user.room);

        // General welcome
        socket.emit('message_info', formatMessage("WebCage", 'Messages are limited to this room! '));

        //Broadcast everytime users connects
        socket.broadcast
            .to(user.room)
            .emit(
                'message_info',
                formatMessage("WebCage", `${user.username} has joined the room`)
            );

        // Current active users and room name
        // io.to(room).emit('roomUsers', {
        //     room: room,
        //     users: getIndividualRoomUsers(room)
        // });
    });

    socket.on('getDialogs', async (user_id, username) => {
        try {
            const response = await dialogService.getAllDialogsByUser({user_id})
            // response.forEach((item) => {
            //     newUser(socket.id, username, user_id, item.convid);
            // })
            socket.emit('getDialogs', response)
        } catch (e) {
            console.log('Ошибка получения диалогов ' + e)
        }
    })

    // Отправка сообщений
    socket.on('chatMessage', async (msg) => {
        const user = getActiveUser(socket.id);
        try {
            if(user) {
                const response = await messageService.createMessage(msg)
                io.sockets.to(10).emit('message', {
                    messages:response,
                    room:user.room
                });
            }
        } catch (e) {
            console.log('Ошибка отправки сообщения ' + e)
        }
    });

    // Runs when client disconnects
    socket.on('exitRoom', () => {
        const user = exitRoom(socket.id);

        if (user) {
            // socket.leave(user.room);
            // io.to(user.room).emit(
            //     'message',
            //     formatMessage("WebCage", `${user.username} has left the room`)
            // );


            // Current active users and room name
            // io.to(user.room).emit('roomUsers', {
            //     room: user.room,
            //     users: getIndividualRoomUsers(user.room)
            // });
        }
    });

    socket.on('disconnect', () => {

    })
});

app.use(errorMiddleware);
app.use(errors());

server.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))
