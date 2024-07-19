const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const { initialize } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const annonceRoutes = require('./routes/annonceRoutes');
const userRoutes = require('./routes/userRoutes');
const conseilRoutes = require('./routes/conseilRoutes');
const multer = require('multer');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const port = 8080;

initialize();

const corsOptions = {
  origin: 'http://localhost:8081', // Remplace par l'origine de ton frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
};

app.use(cors(corsOptions));
app.use(morgan('combined'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ 
  storage, 
  limits: { fileSize: 50 * 1024 * 1024 }
});

app.use('/auth', authRoutes);
app.use('/annonces', annonceRoutes);
app.use('/user', userRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/conseils', conseilRoutes);

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const clients = new Map();

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'identify') {
      clients.set(data.userId, ws);
      ws.userId = data.userId;
      console.log(`User ${data.userId} connected`);
    } else if (data.type === 'message') {
      const recipientWs = clients.get(data.to);
      if (recipientWs && recipientWs.readyState === WebSocket.OPEN) {
        recipientWs.send(JSON.stringify(data));
      }
    }
  });

  ws.on('close', () => {
    console.log(`User ${ws.userId} disconnected`);
    clients.delete(ws.userId);
  });

  ws.on('error', (error) => {
    console.error(`WebSocket error: ${error}`);
  });

  ws.send('Welcome to WebSocket server');
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
