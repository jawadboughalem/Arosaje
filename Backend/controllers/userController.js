// userController.js
const { getUserById, updateUserPassword , getUserInfoFromDb }= require('../models/UserModel');
const bcrypt = require('bcrypt');


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

// changement du password 

const changePassword = (req, res) => {
  const userId = req.userId; // Récupérer l'ID de l'utilisateur depuis le middleware d'authentification
  const { currentPassword, newPassword } = req.body;

  getUserById(userId, (err, user) => {
    if (err || !user) {
      console.error('Utilisateur non trouvé:', err);
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    console.log('Utilisateur trouvé:', user);

    bcrypt.compare(currentPassword, user.password, (err, isMatch) => {  // Utilisation de 'user.password' avec 'p' minuscule
      if (err) {
        console.error('Erreur lors de la comparaison des mots de passe:', err);
        return res.status(500).json({ error: 'Erreur lors de la comparaison des mots de passe' });
      }

      console.log('Résultat de la comparaison des mots de passe:', isMatch);

      if (!isMatch) {
        return res.status(401).json({ error: 'Mot de passe actuel incorrect' });
      }

      bcrypt.hash(newPassword, 10, (err, hash) => {
        if (err) {
          console.error('Erreur lors du hachage du nouveau mot de passe:', err);
          return res.status(500).json({ error: 'Erreur lors du hachage du nouveau mot de passe' });
        }

        console.log('Nouveau mot de passe hashé:', hash);

        updateUserPassword(userId, hash, (err) => {
          if (err) {
            console.error('Erreur lors de la mise à jour du mot de passe:', err);
            return res.status(500).json({ error: 'Erreur lors de la mise à jour du mot de passe' });
          }
          res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
        });
      });
    });
  });
};



module.exports = { 
  getUserInfo,
  changePassword,
  
};