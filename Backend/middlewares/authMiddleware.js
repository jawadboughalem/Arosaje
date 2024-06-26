const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/config');

const authenticateToken = (req, res, next) => {
    console.log('Authenticating token');
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.warn('Access denied. No token provided.');
        return res.status(401).json({ error: 'Accès refusé. Aucun token fourni.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error('Invalid token:', err.message);
            return res.status(403).json({ error: 'Token invalide.' });
        }
        req.userId = decoded.userId;
        console.log('Token verified successfully. User ID:', req.userId);
        next();
    });
};

module.exports = authenticateToken;
