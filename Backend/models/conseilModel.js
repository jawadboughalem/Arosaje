const { db } = require('../config/db');

const Conseil = {
  create: (conseil, callback) => {
    const { Code_Utilisateurs, Titre, Description } = conseil;
    db.run(
      `INSERT INTO Conseils (Code_Utilisateurs, Titre, Description) VALUES (?, ?, ?)`,
      [Code_Utilisateurs, Titre, Description],
      function(err) {
        if (err) {
          callback(err);
        } else {
          callback(null, { Code_Conseils: this.lastID, ...conseil });
        }
      }
    );
  },
  getAll: (callback) => {
    db.all(`SELECT * FROM Conseils`, [], (err, rows) => {
      if (err) {
        callback(err);
      } else {
        callback(null, rows);
      }
    });
  }
};

module.exports = Conseil;
