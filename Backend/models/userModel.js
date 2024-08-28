const { db } = require('../config/db');

const getUserById = (userId, callback) => {
  const query = 'SELECT * FROM utilisateurs WHERE Code_Utilisateurs = ?';
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

const updateUserPassword = (userId, hashedPassword, callback) => {
  const query = 'UPDATE utilisateurs SET password = ? WHERE Code_Utilisateurs = ?';
  db.run(query, [hashedPassword, userId], (err) => {
    if (err) {
      console.error('Erreur lors de la mise à jour du mot de passe:', err);
    }
    callback(err);
  });
};

const updateUserPhoto = (id, fileName, callback) => {
  const query = 'UPDATE utilisateurs SET photo = ? WHERE Code_Utilisateurs = ?';
  db.run(query, [fileName, id], callback);
};

const getUserPhoto = (id, callback) => {
  const query = 'SELECT photo FROM utilisateurs WHERE Code_Utilisateurs = ?';
  db.get(query, [id], (err, row) => {
    if (err) {
      return callback(err);
    }
    callback(null, row ? row.photo : null);
  });
};


const getUserByBotanist = (userId, callback) => {
  const query = 'SELECT botaniste FROM utilisateurs WHERE Code_Utilisateurs = ?';
  db.get(query, [userId], (err, row) => {
    if (err) {
      console.error('Erreur lors de la récupération du statut de botaniste:', err);
      return callback(err);
    }
    callback(null, row ? row.botaniste : null); // Retourne le statut botaniste
  });
};

module.exports = {
  getUserById,
  updateUserPassword,
  getUserInfoFromDb,
  updateUserPhoto,
  getUserPhoto,
  getUserByBotanist, 
};
