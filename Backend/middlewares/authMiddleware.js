// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/config');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'Accès refusé. Aucun token fourni.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token invalide.' });
        }
        req.userId = decoded.userId;
        next();
    });
};

module.exports = authenticateToken;