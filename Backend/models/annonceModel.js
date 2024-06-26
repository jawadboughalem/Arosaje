const { db } = require('../config/db');

exports.createAnnonce = (annonce, callback) => {
  const { plantName, description, location, startDate, endDate, photo, userName, userImage } = annonce;
  const query = `
    INSERT INTO Plantes (NomPlante, Description, Localisation, DateDebut, DateFin, PhotoPlante, UserName, UserImage)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.run(query, [plantName, description, location, startDate, endDate, photo, userName, userImage], function(err) {
    callback(err, this ? this.lastID : null);
  });
};

exports.getAllAnnonces = (callback) => {
  const query = `SELECT * FROM Plantes`;
  db.all(query, [], (err, rows) => {
    callback(err, rows);
  });
};
