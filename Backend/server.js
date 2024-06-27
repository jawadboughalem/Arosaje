const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { initialize, db } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const annonceRoutes = require('./routes/annonceRoutes'); // Importation des routes d'annonces
const authenticateToken = require('./middlewares/authMiddleware');

const app = express();
const port = 3000;

initialize();

// Middleware pour logger les requêtes HTTP
app.use(morgan('combined'));

app.use(bodyParser.json());
app.use('/auth', authRoutes);

// Utilisation des routes d'annonces protégées
app.use('/annonces', authenticateToken, annonceRoutes);

// Exemple de route protégée
app.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Accès autorisé', userId: req.userId });
});

// Route protégée pour récupérer les informations de l'utilisateur


app.listen(port, '0.0.0.0', () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
