const { db } = require('../config/db');

const createConseil = (conseil, callback) => {
  const { Code_Utilisateurs, Titre, Description, Theme } = conseil;
  const sql = `
    INSERT INTO Conseils (Code_Utilisateurs, Titre, Description, Date, Theme) 
    VALUES (?, ?, ?, ?, ?);
  `;
  const params = [Code_Utilisateurs, Titre, Description, new Date().toISOString(), Theme];

  db.run(sql, params, function(err) {
    if (err) {
      return callback(err);
    }
    const conseilId = this.lastID;
    callback(null, { Code_Conseils: conseilId, ...conseil, Date: new Date().toISOString() });
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

module.exports = {
  createConseil,
  getAllConseils,
};
