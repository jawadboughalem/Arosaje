const express = require('express');
const { addAnnonce, getAllAnnonces } = require('../controllers/annonceController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/addannonce', authenticateToken, addAnnonce);
router.get('/all', authenticateToken, getAllAnnonces);

module.exports = router;
