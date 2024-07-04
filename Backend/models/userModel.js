const { db } = require('../config/db');

// Récupérer les informations utilisateur par ID
const getUserById = (userId, callback) => {
  const query = `SELECT * FROM utilisateurs WHERE Code_Utilisateurs = ?`;
  db.get(query, [userId], (err, row) => {
    if (err) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', err);
      return callback(err);
    }

    console.log('Utilisateur récupéré:', row);
    callback(null, row);
  });
};

const getUserInfoFromDb = (userId, callback) => {
  const query = 'SELECT nom, prenom FROM utilisateurs WHERE Code_Utilisateurs = ?';
  db.get(query, [userId], (err, row) => {
    if (err) {
      return callback(err);
    }
    if (!row) {
      return callback(null, null);
    }
    return callback(null, row);
  });
};

// Mettre à jour le mot de passe de l'utilisateur
const updateUserPassword = (userId, hashedPassword, callback) => {
  const query = `UPDATE utilisateurs SET password = ? WHERE Code_Utilisateurs = ?`;
  db.run(query, [hashedPassword, userId], (err) => {
    if (err) {
      console.error('Erreur lors de la mise à jour du mot de passe:', err);
    }

    callback(err);
  });
};

// Mettre à jour la photo de profil de l'utilisateur
const updateUserPhoto = (userId, photoBase64, callback) => {
  const query = `UPDATE utilisateurs SET photo = ? WHERE Code_Utilisateurs = ?`;
  db.run(query, [photoBase64, userId], (err) => {
    if (err) {
      console.error('Erreur lors de la mise à jour de la photo:', err);
    }

    callback(err);
  });
};

// Récupérer la photo de profil de l'utilisateur
const getUserPhoto = (userId, callback) => {
  const query = `SELECT photo FROM utilisateurs WHERE Code_Utilisateurs = ?`;
  db.get(query, [userId], (err, row) => {
    if (err) {
      console.error('Erreur lors de la récupération de la photo:', err);
      return callback(err, null);
    }
    callback(null, row ? row.photo : null);
  });
};

module.exports = {
  getUserById,
  updateUserPassword,
  updateUserPhoto,
  getUserPhoto,
  getUserInfoFromDb
};
