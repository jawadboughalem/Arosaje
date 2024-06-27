const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { initialize } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const annonceRoutes = require('./routes/annonceRoutes');

const app = express();
const port = 3000;

initialize();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/annonces', annonceRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
