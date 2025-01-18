const {
  getUserById,
  updateUserPassword,
  getUserInfoFromDb,
  updateUserPhoto,
  getUserPhoto,
  isUserBotanist,
} = require('../models/userModel');
const bcrypt = require('bcrypt');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const getUserInfo = async (req, res) => {
  const userId = req.userId;

  try {
    const userInfo = await getUserInfoFromDb(userId);

    if (!userInfo) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.status(200).json({ nom: userInfo.nom, prenom: userInfo.prenom });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des informations utilisateur' });
  }
};

const changePassword = async (req, res) => {
  const userId = req.userId;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Mot de passe actuel incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await updateUserPassword(userId, hashedPassword);

    res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du mot de passe' });
  }
};

const verifyPassword = async (req, res) => {
  const userId = req.userId;
  const { currentPassword } = req.body;

  try {
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Mot de passe actuel incorrect' });
    }

    res.status(200).json({ message: 'Mot de passe vérifié avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la vérification du mot de passe' });
  }
};

const updateUserProfilePic = async (req, res) => {
  const userId = req.userId;
  const photoBuffer = req.file.buffer;
  const fileName = `${uuidv4()}.webp`;
  const filePath = path.join(__dirname, '../uploads', fileName);

  try {
    await sharp(photoBuffer).webp({ quality: 80 }).toFile(filePath);
    await updateUserPhoto(userId, fileName);

    res.status(200).json({ message: 'Photo de profil mise à jour avec succès', fileName });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la photo de profil' });
  }
};

const getUserProfilePic = async (req, res) => {
  const userId = req.userId;

  try {
    const fileName = await getUserPhoto(userId);

    if (!fileName) {
      return res.status(404).json({ error: 'Photo de profil non trouvée' });
    }

    const filePath = path.join(__dirname, '../uploads', fileName);

    if (fs.existsSync(filePath)) {
      res.setHeader('Content-Type', 'image/webp');
      return res.status(200).sendFile(filePath);
    }

    res.status(404).json({ error: 'Photo de profil non trouvée' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la photo de profil' });
  }
};

const checkIfBotanist = async (req, res) => {
  const userId = req.userId;

  try {
    const isBotanist = await isUserBotanist(userId);

    if (isBotanist === null) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.status(200).json({ isBotanist });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la vérification du statut de botaniste' });
  }
};

module.exports = {
  getUserInfo,
  changePassword,
  verifyPassword,
  updateUserProfilePic,
  getUserProfilePic,
  checkIfBotanist,
};
