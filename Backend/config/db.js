const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'Arosaje.db');
const db = new sqlite3.Database(dbPath);

const initialize = () => {
  db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS utilisateurs (
      Code_Utilisateurs INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      prenom TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      photo TEXT,
      botaniste INTEGER NOT NULL CHECK (botaniste IN (0, 1)),
      numero TEXT,
      adresse TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS photos (
      Code_Photos INTEGER PRIMARY KEY,
      code_Utilisateurs INTEGER,
      code_Postes INTEGER,
      photo TEXT NOT NULL,
      date INTEGER,
      FOREIGN KEY (Code_Utilisateurs) REFERENCES Utilisateurs(Code_Utilisateurs),
      FOREIGN KEY (Code_Postes) REFERENCES Postes(Code_Postes)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Messages (
      Code_Messages INTEGER PRIMARY KEY,
      Code_Expediteur INTEGER,
      Code_Destinataire INTEGER,
      Message TEXT,
      DateEnvoi DATETIME,
      FOREIGN KEY (Code_Expediteur) REFERENCES Utilisateurs(Code_Utilisateurs),
      FOREIGN KEY (Code_Destinataire) REFERENCES Utilisateurs(Code_Utilisateurs)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS postes (
      Code_Postes INTEGER PRIMARY KEY,
      code_Utilisateurs INTEGER,
      code_Photos INTEGER,
      titre TEXT,
      description TEXT,
      datePoste DATETIME,
      localisation TEXT,
      FOREIGN KEY (Code_Utilisateurs) REFERENCES Utilisateurs(Code_Utilisateurs),
      FOREIGN KEY (Code_Photos) REFERENCES Photos(Code_Photos)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Commentaires (
      Code_Commentaires INTEGER PRIMARY KEY,
      Code_Postes INTEGER,
      Code_Utilisateurs INTEGER,
      Texte TEXT,
      DateCommentaire DATETIME,
      FOREIGN KEY (Code_Postes) REFERENCES Postes(Code_Postes),
      FOREIGN KEY (Code_Utilisateurs) REFERENCES Utilisateurs(Code_Utilisateurs)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Conseils (
      Code_Conseils INTEGER PRIMARY KEY,
      Code_Utilisateurs INTEGER,
      Titre TEXT,
      Description TEXT,
      FOREIGN KEY (Code_Utilisateurs) REFERENCES Utilisateurs(Code_Utilisateurs)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Gardes (
      Code_Gardes INTEGER PRIMARY KEY,
      Code_Postes INTEGER,
      Code_Gardien INTEGER,
      Statut TEXT,
      DateDebut TEXT,
      DateFin TEXT,
      FOREIGN KEY (Code_Postes) REFERENCES Postes(Code_Postes),
    )`);
  });
};

module.exports = {
  db,
  initialize,
  dbPath
};
