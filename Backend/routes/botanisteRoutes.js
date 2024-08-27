const express = require('express');
const router = express.Router();
const multer = require('multer');
const authenticateToken = require('../middlewares/authMiddleware');
const { isBotanist } = require('../controllers/botanisteController');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware d'authentification

// Route pour vérifier si l'utilisateur est botaniste
router.get('/is-botanist', authenticateToken, isBotanist);

module.exports = router;
