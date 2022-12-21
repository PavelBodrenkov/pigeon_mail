const express = require('express')
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser')
const indexRouter = require('./routes/index.routes')
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config()
const PORT = process.env.PORT || 8080;
const errorMiddleware = require('./middlewares/error.middleware');
const messageService = require('./services/message.service')
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
        origin:'http://localhost:3000',
        methods:['GET', "POST"]
    }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:['http://localhost:3000', 'http://localhost:3001']
}));

io.on('connection', socket => {

    socket.on('connection', (user) => {
        socket.emit('connection', onlineUser(user))
    })

    socket.on('joinRoom', ({ username, user_id, room }) => {
        const user = newUser(socket.id, username, user_id, room);

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
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getIndividualRoomUsers(user.room)
        });
    });

    // Listen for client message
    socket.on('chatMessage', msg => {
        const user = getActiveUser(socket.id);
        messageService.createMessage(msg)
            .then((res) => {
                console.log('res', res)
                io.to(user.room).emit('message', res);
            })
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
        const user = exitRoom(socket.id);

        if (user) {
            io.to(user.room).emit(
                'message',
                formatMessage("WebCage", `${user.username} has left the room`)
            );

            // Current active users and room name
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getIndividualRoomUsers(user.room)
            });
        }
    });
});


app.use('/api', indexRouter);

app.use(errorMiddleware);
app.use(errors());

server.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))