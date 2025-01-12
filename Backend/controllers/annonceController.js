const path = require('path');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const annonceModel = require('../models/annonceModel');

// Ajouter une nouvelle annonce
const addAnnonce = async (req, res) => {
  const annonce = req.body;
  annonce.userId = req.userId; // Associer l'annonce à l'utilisateur actuel

  if (!req.file) {
    return res.status(400).json({ error: 'Image non fournie' });
  }

  const photoBuffer = req.file.buffer;
  const fileName = `${uuidv4()}.webp`;

  try {
    // Convertir l'image en WebP
    const filePath = path.join(__dirname, '../uploads/temp', fileName);
    await sharp(photoBuffer).webp({ quality: 80 }).toFile(filePath);

    // Sauvegarder l'annonce via le modèle
    annonce.photo = fileName;
    const postId = await annonceModel.createAnnonce({
      ...annonce,
      photo: fileName,
    });

    res.status(201).json({ message: 'Annonce ajoutée avec succès', postId });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'annonce:', error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'annonce' });
  }
};

// Récupérer toutes les annonces
const getAllAnnonces = async (req, res) => {
  try {
    const annonces = await annonceModel.getAllAnnonces();
    res.status(200).json(annonces);
  } catch (error) {
    console.error('Erreur lors de la récupération des annonces:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des annonces' });
  }
};

// Récupérer une image spécifique d'annonce
const getAnnonceImage = async (req, res) => {
  const { filename } = req.params;

  try {
    const imagePath = path.join(__dirname, '../uploads/plante', filename);
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: 'Image non trouvée' });
    }

    const imageBuffer = await sharp(imagePath).toBuffer();
    res.setHeader('Content-Type', 'image/webp');
    res.status(200).send(imageBuffer);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'image:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'image' });
  }
};

// Récupérer les annonces pour un utilisateur spécifique
const getAnnoncesByUser = async (req, res) => {
  try {
    const userId = req.userId;
    const annonces = await annonceModel.getAnnoncesByUser(userId);
    res.status(200).json(annonces);
  } catch (error) {
    console.error('Erreur lors de la récupération des annonces par utilisateur:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des annonces par utilisateur' });
  }
};

module.exports = {
  addAnnonce,
  getAllAnnonces,
  getAnnonceImage,
  getAnnoncesByUser,
};
