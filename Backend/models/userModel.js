// models/UserModel.js

const { db } = require('../config/db');

const getUserInfoFromDb = (userId, callback) => {
  const query = `SELECT nom, prenom FROM Utilisateurs WHERE Code_Utilisateurs = ?`;
  db.get(query, [userId], (err, row) => {
    if (err) return callback(err, null);
    callback(null, row);
  });
};

const getUserById = (userId, callback) => {
  const query = `SELECT * FROM Utilisateurs WHERE Code_Utilisateurs = ?`;
  db.get(query, [userId], (err, row) => {
    if (err) return callback(err);
    callback(null, row);
  });
};

const updateUserPassword = (userId, hashedPassword, callback) => {
  const query = `UPDATE Utilisateurs SET password = ? WHERE Code_Utilisateurs = ?`;
  db.run(query, [hashedPassword, userId], (err) => {
    callback(err);
  });
};

const updateUserProfilePicInDb = (userId, profilePic, callback) => {
  const query = `UPDATE Utilisateurs SET photo = ? WHERE Code_Utilisateurs = ?`;
  db.run(query, [profilePic, userId], (err) => {
    callback(err);
  });
};

module.exports = {
  getUserInfoFromDb,
  updateUserPassword,
  getUserById,
  updateUserProfilePicInDb,
};
