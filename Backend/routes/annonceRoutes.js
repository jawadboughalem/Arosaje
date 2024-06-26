const express = require('express');
const router = express.Router();
const annonceController = require('../controllers/annonceController');

// Route pour ajouter une annonce
router.post('/', annonceController.addAnnonce);

// Route pour récupérer toutes les annonces
router.get('/', annonceController.getAllAnnonces);

module.exports = router;
