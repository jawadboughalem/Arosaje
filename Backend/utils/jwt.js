const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/config');

const generateToken = (userId) => {
    return jwt.sign({ userId }, secretKey, { expiresIn: '30s' });
};

module.exports = {
    generateToken
};
