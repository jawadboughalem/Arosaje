const db = require('../config/db');

const Conversation = {
  findOrCreateConversation: (ownerId, expediteurId, callback) => {
    const queryCheck = `
      SELECT * FROM Conversation 
      WHERE (Code_Expediteur = ? AND Code_Destinataire = ?) 
      OR (Code_Expediteur = ? AND Code_Destinataire = ?)
    `;

    db.get(queryCheck, [ownerId, expediteurId, expediteurId, ownerId], (err, row) => {
      if (err) {
        return callback(err);
      }
      
      if (row) {
        // La conversation existe déjà
        return callback(null, row);
      } else {
        // Créer une nouvelle conversation
        const queryInsert = `
          INSERT INTO Conversation (DateDebut, DateFin, Code_Expediteur, Code_Destinataire) 
          VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?, ?)
        `;
        db.run(queryInsert, [expediteurId, ownerId], function(err) {
          if (err) {
            return callback(err);
          }
          callback(null, { Code_Conversation: this.lastID });
        });
      }
    });
  }
};

module.exports = Conversation;
