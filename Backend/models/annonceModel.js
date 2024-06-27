const { db } = require('../config/db');

const createAnnonce = (annonce, callback) => {
  const { plantName, description, location, startDate, endDate, photo, userId } = annonce;
  const sql = `
    INSERT INTO Postes (Code_Utilisateurs, titre, Description, DatePoste, Localisation) 
    VALUES (?, ?, ?, ?, ?);
  `;
  const params = [userId, plantName, description, new Date(), location];
  
  db.run(sql, params, function(err) {
    if (err) {
      return callback(err);
    }
    const postId = this.lastID;
    const photoSql = `
      INSERT INTO Photos (datePhotos, CheminAcces, Code_Utilisateurs, Code_Plantes) 
      VALUES (?, ?, ?, ?);
    `;
    const photoParams = [new Date(), photo, userId, null]; // Assuming Code_Plantes is null for now
    db.run(photoSql, photoParams, function(err) {
      if (err) {
        return callback(err);
      }
      callback(null, postId);
    });
  });
};

const getAllAnnonces = (callback) => {
  const sql = 'SELECT * FROM Postes';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
};

module.exports = {
  createAnnonce,
  getAllAnnonces,
};
