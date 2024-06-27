const annonceModel = require('../models/annonceModel');

const addAnnonce = (req, res) => {
  const annonce = req.body;
  annonce.userId = req.userId; // Assuming userId is added by middleware
  annonceModel.createAnnonce(annonce, (err, id) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'annonce' });
    }
    res.status(201).json({ message: 'Annonce ajoutée avec succès', id });
  });
};

const getAllAnnonces = (req, res) => {
  annonceModel.getAllAnnonces((err, rows) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Erreur lors de la récupération des annonces' });
    }
    res.status(200).json(rows);
  });
};

module.exports = {
  addAnnonce,
  getAllAnnonces,
};
