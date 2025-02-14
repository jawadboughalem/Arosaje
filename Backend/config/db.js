const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'Arosaje.db');
const db = new sqlite3.Database(dbPath);

const initialize = () => {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS utilisateurs (
      Code_Utilisateurs INTEGER PRIMARY KEY AUTOINCREMENT,
      nom VARCHAR(20) NOT NULL,
      prenom VARCHAR(20) NOT NULL,
      email VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(20) NOT NULL,
      photo VARCHAR(255),
      botaniste INTEGER NOT NULL CHECK (botaniste IN (0, 1))
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS photos (
      Code_Photos INTEGER PRIMARY KEY,
      Code_Utilisateurs INTEGER,
      Code_Postes INTEGER,
      photo VARCHAR(255) NOT NULL,
      date INTEGER,
      FOREIGN KEY (Code_Utilisateurs) REFERENCES Utilisateurs(Code_Utilisateurs),
      FOREIGN KEY (Code_Postes) REFERENCES Postes(Code_Postes)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS postes (
      Code_Postes INTEGER PRIMARY KEY,
      Code_Utilisateurs INTEGER,
      Code_Photos INTEGER,
      titre VARCHAR(255),
      description TEXT,
      datePoste DATETIME,
      localisation VARCHAR(255),
      FOREIGN KEY (Code_Utilisateurs) REFERENCES Utilisateurs(Code_Utilisateurs),
      FOREIGN KEY (Code_Photos) REFERENCES Photos(Code_Photos)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Conseils (
      Code_Conseils INTEGER PRIMARY KEY,
      Code_Utilisateurs INTEGER,
      Titre VARCHAR(255),
      Description TEXT,
      Date DATETIME,
      Theme VARCHAR(100),
      FOREIGN KEY (Code_Utilisateurs) REFERENCES Utilisateurs(Code_Utilisateurs)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Gardes (
      Code_Gardes INTEGER PRIMARY KEY,
      Code_Postes INTEGER,
      Code_Gardien INTEGER,
      Statut VARCHAR(50),
      DateDebut DATETIME,
      DateFin DATETIME,
      FOREIGN KEY (Code_Postes) REFERENCES Postes(Code_Postes)
    )`);
  });
};

module.exports = {
  db,
  initialize,
  dbPath
};
