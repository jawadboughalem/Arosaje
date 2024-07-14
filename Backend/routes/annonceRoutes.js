const express = require('express');
const { addAnnonce, getAllAnnonces } = require('../controllers/annonceController');
const authenticateToken = require('../middlewares/authMiddleware');
const multer = require('multer');

const router = express.Router();
const upload = multer();

router.post('/addannonce', authenticateToken, upload.single('photo'), addAnnonce);
router.get('/all', authenticateToken, getAllAnnonces);


module.exports = router;
