const {Server} = require('socket.io');

module.exports = (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', "POST"]
        }
    })

    io.on('connection', function (socket) {
        socket.on('DIALOGS:JOIN', (dialogId) => {
            socket.dialogId = dialogId;
            socket.join(dialogId);
        });
        socket.on('DIALOGS:TYPING', (obj) => {
            socket.broadcast.emit('DIALOGS:TYPING', obj);
        });
    });

    return io;
};