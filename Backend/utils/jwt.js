const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/config');

const generateToken = (userId) => {
    return jwt.sign({ userId }, secretKey, { expiresIn: '30m' });
};

module.exports = {
    generateToken
};
