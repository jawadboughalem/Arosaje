const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const { initialize } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const annonceRoutes = require('./routes/annonceRoutes');

const app = express();
const port = 3000;

initialize();

// Configuration CORS
const corsOptions = {
  origin: 'http://localhost:8081', // Remplacez par l'origine de votre frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
};

app.use(cors(corsOptions));

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/annonces', annonceRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
