const { db } = require('../config/db');

const checkIfBotanist = (userId, callback) => {
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
  checkIfBotanist,
};
