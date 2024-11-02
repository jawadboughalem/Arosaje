const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`New client connected, socket id: ${socket.id}`);

  socket.on('joinConversation', (conversationId) => {
    if (conversationId) {
      socket.join(conversationId);
      console.log(`Client with socket id ${socket.id} joined conversation: ${conversationId}`);
    } else {
      console.error("joinConversation reçu sans conversationId");
    }
  });

  socket.on('sendMessage', (data) => {
    const { conversationId, message, idUser } = data;
    console.log(`Message received from ${socket.id} in conversation ${conversationId}: ${message}`);

    // Diffusion du message dans la conversation
    io.to(conversationId).emit('newMessage', { message, idUser, conversationId });
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected, socket id: ${socket.id}`);
  });
});

const PORT = 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));