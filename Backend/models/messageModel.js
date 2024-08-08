// models/messageModel.js
const { db } = require('../config/db');

const Message = {
  create: (message, callback) => {
    const { codeExpediteur, codeDestinataire, messageText, dateEnvoi } = message;
    db.run(
      `INSERT INTO Messages (Code_Expediteur, Code_Destinataire, Message, DateEnvoi) VALUES (?, ?, ?, ?)`,
      [codeExpediteur, codeDestinataire, messageText, dateEnvoi],
      function (err) {
        if (err) {
          return callback(err);
        }
        callback(null, { id: this.lastID, ...message });
      }
    );
  },

  getAll: (userId, callback) => {
    db.all(
      `SELECT * FROM Messages WHERE Code_Expediteur = ? OR Code_Destinataire = ? ORDER BY DateEnvoi ASC`,
      [userId, userId],
      (err, rows) => {
        if (err) {
          return callback(err);
        }
        callback(null, rows);
      }
    );
  },

  getByConversation: (userId, annonceId, callback) => {
    db.all(
      `SELECT * FROM Messages WHERE (Code_Expediteur = ? AND Code_Destinataire = ?) OR (Code_Expediteur = ? AND Code_Destinataire = ?) ORDER BY DateEnvoi ASC`,
      [userId, annonceId, annonceId, userId],
      (err, rows) => {
        if (err) {
          return callback(err);
        }
        callback(null, rows);
      }
    );
  }
};

module.exports = Message;