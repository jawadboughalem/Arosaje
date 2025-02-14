const { db } = require('../config/db');

const createConseil = (conseil, callback) => {
  let { Code_Utilisateurs, Titre, Description, Theme } = conseil;
  // Si Code_Utilisateurs n'est pas fourni, on le définit (à remplacer par la récupération réelle depuis le token)
  if (!Code_Utilisateurs) {
    Code_Utilisateurs = 1;
  }
  const currentDate = new Date().toISOString();
  const sql = `
    INSERT INTO Conseils (Code_Utilisateurs, Titre, Description, Date, Theme) 
    VALUES (?, ?, ?, ?, ?);
  `;
  const params = [Code_Utilisateurs, Titre, Description, currentDate, Theme];

  db.run(sql, params, function(err) {
    if (err) {
      return callback(err);
    }
    const conseilId = this.lastID;
    callback(null, { Code_Conseils: conseilId, Code_Utilisateurs, Titre, Description, Date: currentDate, Theme });
  });
};

const getAllConseils = (callback) => {
  const sql = 'SELECT * FROM Conseils';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
};

const deleteConseil = (conseilId, callback) => {
  const sql = 'DELETE FROM Conseils WHERE Code_Conseils = ?';
  db.run(sql, [conseilId], function(err) {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
};

const updateConseil = (conseilId, updatedConseil, callback) => {
  const { Titre, Description, Theme, Date } = updatedConseil;
  const sql = `
    UPDATE Conseils
    SET Titre = ?, Description = ?, Theme = ?, Date = ?
    WHERE Code_Conseils = ?;
  `;
  const params = [Titre, Description, Theme, Date, conseilId];

  db.run(sql, params, function(err) {
    if (err) {
      return callback(err);
    }
    callback(null, { Code_Conseils: conseilId, Titre, Description, Theme, Date });
  });
};

module.exports = {
  createConseil,
  getAllConseils,
  deleteConseil,
  updateConseil, 
};
