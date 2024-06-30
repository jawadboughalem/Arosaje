
const { db } = require('../config/db');

const getUserInfoFromDb = (userId, callback) => {
  const query = `SELECT nom, prenom FROM Utilisateurs WHERE Code_Utilisateurs = ?`;
  db.get(query, [userId], (err, row) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, row);
  });
};

// changement de mot de passe parmaettre profil 

// Récupérer les informations utilisateur par ID
const getUserById = (userId, callback) => {
  const query = `SELECT * FROM Utilisateurs WHERE Code_Utilisateurs = ?`;
  db.get(query, [userId], (err, row) => {
    if (err) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', err);
      return callback(err);
    }

    console.log('Utilisateur récupéré:', row);
    callback(null, row);
  });
};

// Mettre à jour le mot de passe de l'utilisateur
const updateUserPassword = (userId, hashedPassword, callback) => {
  const query = `UPDATE Utilisateurs SET Password = ? WHERE Code_Utilisateurs = ?`;
  db.run(query, [hashedPassword, userId], (err) => {
    if (err) {
      console.error('Erreur lors de la mise à jour du mot de passe:', err);
    }

    callback(err);
  });
};


module.exports = {
  getUserInfoFromDb ,
  updateUserPassword,
  getUserById
};