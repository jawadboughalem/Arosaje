const { db } = require('../config/db');

const createAnnonce = (annonce, callback) => {
  const { nomPlante, description, localisation, dateDebut, dateFin, photo, userId } = annonce;
  console.log('Paramètres pour l\'insertion SQL:', { userId, nomPlante, description, localisation, dateDebut, dateFin });

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
      const photoId = this.lastID;

      const updatePostSql = `
        UPDATE postes SET code_Photos = ? WHERE Code_Postes = ?;
      `;
      const updatePostParams = [photoId, postId];
      db.run(updatePostSql, updatePostParams, function(err) {
        if (err) {
          return callback(err);
        }

        const gardeSql = `
          INSERT INTO Gardes (Code_Postes, Code_Gardien, Statut, DateDebut, DateFin) 
          VALUES (?, ?, ?, ?, ?);
        `;
        const gardeParams = [postId, userId, 'Disponible', dateDebut, dateFin];
        db.run(gardeSql, gardeParams, function(err) {
          if (err) {
            return callback(err);
          }
          callback(null, postId);
        });
      });
    });
  });
};

const getAllAnnonces = (callback) => {
  const sql = `
    SELECT p.Code_Postes, p.titre, p.description, p.datePoste, p.localisation, ph.photo, g.DateDebut, g.DateFin
FROM postes p
LEFT JOIN photos ph ON p.Code_Postes = ph.code_Postes
LEFT JOIN Gardes g ON p.Code_Postes = g.Code_Postes
ORDER BY p.datePoste DESC;
  `;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return callback(err);
    }
    console.log('Données récupérées de la base de données:', rows);

    const annonces = rows.map(row => ({
      ...row,
      dateDebut: row.DateDebut ? new Date(row.DateDebut).toISOString() : null,
      dateFin: row.DateFin ? new Date(row.DateFin).toISOString() : null,
    }));

    callback(null, annonces);
  });
};

module.exports = {
  createAnnonce,
  getAllAnnonces,
};