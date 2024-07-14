const annonceModel = require('../models/annonceModel');
const sharp = require('sharp');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const addAnnonce = async (req, res) => {
  const annonce = req.body;
  annonce.userId = req.userId;

  if (!req.file) {
    return res.status(400).json({ error: 'Image non fournie' });
  }

  const photoBuffer = req.file.buffer;
  const fileName = `${uuidv4()}.webp`;
  const filePath = path.join(__dirname, '../uploads/plante', fileName);

  try {
    await sharp(photoBuffer)
      .webp({ quality: 80 })
      .toFile(filePath);

    annonce.photo = fileName;

    annonceModel.createAnnonce(annonce, (err, id) => {
      if (err) {
        console.error('Database error:', err.message);
        return res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'annonce' });
      }
      res.status(201).json({ message: 'Annonce ajoutée avec succès', id });
    });
  } catch (error) {
    console.error('Erreur lors de la conversion de l\'image:', error);
    res.status(500).json({ error: 'Erreur lors de la conversion de l\'image' });
  }
};

const getAllAnnonces = (req, res) => {
  annonceModel.getAllAnnonces((err, rows) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Erreur lors de la récupération des annonces' });
    }
    console.log('Annonces récupérées:', rows);
    res.status(200).json(rows);
  });
};


module.exports = {
  addAnnonce,
  getAllAnnonces,
};
