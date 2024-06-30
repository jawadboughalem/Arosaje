// user1Model.js
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

module.exports = { getUserInfoFromDb };