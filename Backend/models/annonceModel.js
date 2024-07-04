const { db } = require('../config/db');

const createAnnonce = (annonce, callback) => {
  const { nomPlante, description, localisation, dateDebut, dateFin, photo, userId } = annonce;
  console.log('Paramètres pour l\'insertion SQL:', { userId, nomPlante, description, localisation });

  const sql = `
    INSERT INTO postes (code_Utilisateurs, titre, description, datePoste, localisation) 
    VALUES (?, ?, ?, ?, ?);
  `;
  const params = [userId, nomPlante, description, new Date(), localisation];
  
  db.run(sql, params, function(err) {
    if (err) {
      return callback(err);
    }
    const postId = this.lastID;
    const photoSql = `
      INSERT INTO photos (date, photo, code_Utilisateurs, code_Postes) 
      VALUES (?, ?, ?, ?);
    `;
    const photoParams = [new Date().getTime(), photo, userId, postId];
    db.run(photoSql, photoParams, function(err) {
      if (err) {
        return callback(err);
      }
      callback(null, postId);
    });
  });
};

const getAllAnnonces = (callback) => {
  const sql = 'SELECT * FROM postes';
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
