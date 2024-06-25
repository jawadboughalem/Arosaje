const express = require('express');
const bodyParser = require('body-parser');
const { initialize } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const authenticateToken = require('./middlewares/authMiddleware');

const app = express();
const port = 3000;

initialize();

app.use(bodyParser.json());
app.use('/auth', authRoutes);

// Exemple de route protégée
app.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Accès autorisé', userId: req.userId });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Serveur démarré sur le port ${port}`);
});