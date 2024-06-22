const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Chemin absolu vers la base de données Arosaje.db
const dbPath = path.resolve(__dirname, 'teste.db');

// Création d'une instance de la base de données SQLite
const db = new sqlite3.Database(dbPath);

// Fonction d'initialisation de la base de données
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
    });
};

// Export des modules
module.exports = {
    db,
    initialize,
    dbPath
};
