const express = require('express');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const PORT = 8000;

// Utilisation de CORS
app.use(cors());

const server = app.listen(PORT, () => {
    console.log('server is running on port ' + PORT);
});

const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('socket=', socket.id);

    socket.on('CLIENT_MSG', (data) => {
        console.log('msg=', data);
        io.emit('SERVER_MSG', data);
    });
});
