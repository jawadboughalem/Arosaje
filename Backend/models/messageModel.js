const db = require('./config/db');
class Message {
  static create(message, callback) {
    const { Code_Expediteur, Code_Destinataire, Message, DateEnvoi } = message;
    const query = `
      INSERT INTO Messages (Code_Expediteur, Code_Destinataire, Message, DateEnvoi)
      VALUES (?, ?, ?, ?)
    `;
    db.run(query, [Code_Expediteur, Code_Destinataire, Message, DateEnvoi], function(err) {
      if (err) {
        return callback(err);
      }
      callback(null, { id: this.lastID });
    });
  }

  static getAll(callback) {
    db.all(`SELECT * FROM Messages`, [], (err, rows) => {
      if (err) {
        return callback(err);
      }
      callback(null, rows);
    });
  }
}

module.exports = Message;
