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
app.get('/user-info', authenticateToken, (req, res) => {
    const userId = req.userId;
    console.log(`Fetching info for user ID: ${userId}`);

    const query = `SELECT nom, prenom FROM utilisateurs WHERE Code_Utilisateurs = ?`;
    db.get(query, [userId], (err, row) => {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ error: 'Erreur lors de la récupération des informations utilisateur' });
        }

        if (!row) {
            console.warn('No user found for userId:', userId);
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        console.log('User info retrieved:', row);
        res.status(200).json({ nom: row.nom, prenom: row.prenom });
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
