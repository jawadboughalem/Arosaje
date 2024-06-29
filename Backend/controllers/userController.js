// controllers/userController.js
const { getUserInfoFromDb } = require('../models/userModel');

const getUserInfo = (req, res) => {
  const userId = req.userId;
  console.log(`Fetching info for user ID: ${userId}`);

  getUserInfoFromDb(userId, (err, userInfo) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Erreur lors de la récupération des informations utilisateur' });
    }

    if (!userInfo) {
      console.warn('No user found for userId:', userId);
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    console.log('User info retrieved:', userInfo);
    res.status(200).json({ nom: userInfo.nom, prenom: userInfo.prenom });
  });
};

module.exports = { getUserInfo };
