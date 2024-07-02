const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/config');

const generateToken = (userId) => {
    return jwt.sign({ userId }, secretKey, { expiresIn: '15m' });
};

module.exports = {
    generateToken
};
