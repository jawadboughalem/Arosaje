import * as SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'Fleur',
    location: 'default',
  },
  () => {
    console.log('Database opened');
  },
  (error) => {
    console.error('Error opening database:', error);
  }
);

export const createTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS utilisateurs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT,
        prenom TEXT,
        email TEXT,
        password TEXT,
        photo TEXT,
        botaniste INTEGER,
        numero TEXT,
        adresse TEXT
      )`,
      [],
      () => {
        console.log('utilisateurs table created successfully');
      },
      (error) => {
        console.error('Error creating utilisateurs table:', error);
      }
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS photos (
        idPhotos INTEGER PRIMARY KEY,
        datePhotos INTEGER,
        CheminAcces TEXT NOT NULL,
        IdUtilisateurs INTEGER,
        IdPlantes INTEGER,
        FOREIGN KEY (IdUtilisateurs) REFERENCES utilisateurs(id),
        FOREIGN KEY (IdPlantes) REFERENCES Plantes(IdPlantes)
      )`,
      [],
      () => {
        console.log('photos table created successfully');
      },
      (error) => {
        console.error('Error creating photos table:', error);
      }
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Messages (
        IdMessages INTEGER PRIMARY KEY,
        IdUtilisateurs INTEGER,
        Message VARCHAR(100),
        DateEnvoi TEXT,
        FOREIGN KEY (IdUtilisateurs) REFERENCES utilisateurs(id)
      )`,
      [],
      () => {
        console.log('messages table created successfully');
      },
      (error) => {
        console.error('Error creating messages table:', error);
      }
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Postes (
        IdPostes INTEGER PRIMARY KEY,
        IdUtilisateurs INTEGER,
        titre VARCHAR(100),
        Description VARCHAR(255),
        DatePoste VARCHAR(100),
        Localisation VARCHAR(100),
        FOREIGN KEY (IdUtilisateurs) REFERENCES utilisateurs(id)
      )`,
      [],
      () => {
        console.log('postes table created successfully');
      },
      (error) => {
        console.error('Error creating postes table:', error);
      }
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS commentaires (
        Idcommentaire INTEGER PRIMARY KEY,
        IdUtilisateurs INTEGER,
        IdPlantes INTEGER,
        texte VARCHAR(100),
        DateCommentaire VARCHAR(100),
        FOREIGN KEY (IdUtilisateurs) REFERENCES utilisateurs(id),
        FOREIGN KEY (IdPlantes) REFERENCES Plantes(IdPlantes)
      )`,
      [],
      () => {
        console.log('commentaires table created successfully');
      },
      (error) => {
        console.error('Error creating commentaires table:', error);
      }
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Plantes (
        IdPlantes INTEGER PRIMARY KEY,
        IdUtilisateurs INTEGER,
        NomPlante VARCHAR(100),
        PhotoPlante VARCHAR(100),
        Description VARCHAR(100),
        FOREIGN KEY (IdUtilisateurs) REFERENCES utilisateurs(id)
      )`,
      [],
      () => {
        console.log('plantes table created successfully');
      },
      (error) => {
        console.error('Error creating plantes table:', error);
      }
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Gardes (
        IdGarde INTEGER PRIMARY KEY,
        idUtilisateurs INTEGER,
        IdPlantes INTEGER,
        DateDebut VARCHAR(100),
        DateFin VARCHAR(100),
        localisation TEXT,
        FOREIGN KEY (idUtilisateurs) REFERENCES utilisateurs(id),
        FOREIGN KEY (idPlantes) REFERENCES Plantes(IdPlantes)
      )`,
      [],
      () => {
        console.log('Gardes table created successfully');
      },
      (error) => {
        console.error('Error creating Gardes table:', error);
      }
    );
  });
};

export default db;
