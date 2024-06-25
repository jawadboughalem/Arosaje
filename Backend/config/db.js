const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'Arosaje.db');
const db = new sqlite3.Database(dbPath);

const initialize = () => {
  db.serialize(() => {
    // J'encapsule toutes les instructions de création de table dans une transaction pour une meilleure cohérence
    db.run(`CREATE TABLE IF NOT EXISTS Utilisateurs (
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
    db.run(`CREATE TABLE IF NOT EXISTS Photos (
      Code_Photos INTEGER PRIMARY KEY,
      datePhotos INTEGER,
      CheminAcces TEXT NOT NULL,
      Code_Utilisateurs INTEGER,
      Code_Plantes INTEGER,
      FOREIGN KEY (Code_Utilisateurs) REFERENCES utilisateurs(Code_Utilisateurs),
      FOREIGN KEY (Code_Plantes) REFERENCES Plantes(Code_Plantes)
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS Messages (
      Code_Messages INTEGER PRIMARY KEY,
      Code_Utilisateurs INTEGER,
      Message TEXT,
      DateEnvoi DATETIME,
      FOREIGN KEY (Code_Utilisateurs) REFERENCES Utilisateurs(Code_Utilisateurs)
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS Postes (
      Code_Postes INTEGER PRIMARY KEY,
      Code_Utilisateurs INTEGER,
      titre TEXT,
      Description TEXT,
      DatePoste DATETIME,
      Localisation TEXT,
      FOREIGN KEY (Code_Utilisateurs) REFERENCES utilisateurs(Code_Utilisateurs)
    );`)    
    db.run(`CREATE TABLE IF NOT EXISTS Commentaires (
      Code_Commentaire INTEGER PRIMARY KEY,
      Code_Utilisateurs INTEGER,
      Code_Plantes INTEGER,
      texte TEXT,
      DateCommentaire DATETIME,
      FOREIGN KEY (Code_Utilisateurs) REFERENCES utilisateurs(Code_Utilisateurs),
      FOREIGN KEY (Code_Plantes) REFERENCES Plantes(Code_Plantes)
    );`)    
    db.run(`CREATE TABLE IF NOT EXISTS Plantes (
      Code_Plantes INTEGER PRIMARY KEY,
      Code_Utilisateurs INTEGER,
      NomPlante TEXT,
      PhotoPlante BLOB,
      Description TEXT,
      FamillePlante TEXT,
      FOREIGN KEY (Code_Utilisateurs) REFERENCES Utilisateurs(Code_Utilisateurs)
    );`)    
    db.run(`CREATE TABLE IF NOT EXISTS Gardes (
      Code_Garde INTEGER PRIMARY KEY,
      Code_Utilisateurs INTEGER,
      Code_Plantes INTEGER,
      DateDebut DATETIME,
      DateFin DATETIME,
      localisation TEXT,
      FOREIGN KEY (Code_Utilisateurs) REFERENCES utilisateurs(Code_Utilisateurs),
      FOREIGN KEY (Code_Plantes) REFERENCES Plantes(Code_Plantes)
    );`)    
  });
};

// J'exporte la connexion à la base de données et la fonction d'initialisation
module.exports = {
  db,
  initialize,
  dbPath
};