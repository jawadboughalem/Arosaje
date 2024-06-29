const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const { getUserInfo } = require('../controllers/userController');

router.get('/user-info', authenticateToken, getUserInfo);

module.exports = router;