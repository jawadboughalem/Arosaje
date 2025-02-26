// __tests__/conseilModel.test.js
const sqlite3 = require('sqlite3').verbose();

// On configure le mock pour retourner une instance unique de DB en mémoire.
jest.mock('../config/db', () => {
  const sqlite3 = require('sqlite3').verbose();
  const db = new sqlite3.Database(':memory:');
  return { db };
});

// On récupère l'instance mockée utilisée par le modèle.
const { db } = require('../config/db');
const { createConseil, getAllConseils, updateConseil, deleteConseil } = require('../models/conseilModel');

describe('Tests Unitaires du Modèle "conseil"', () => {
  beforeAll((done) => {
    // Création de la table Conseils sur la même instance de DB
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS Conseils (
        Code_Conseils INTEGER PRIMARY KEY AUTOINCREMENT,
        Code_Utilisateurs INTEGER,
        Titre TEXT,
        Description TEXT,
        Date TEXT,
        Theme TEXT
      )`, done);
    });
  });

  test('Création d’un conseil', (done) => {
    const conseil = { Code_Utilisateurs: 2, Titre: 'Test', Description: 'Desc', Theme: 'Test' };
    createConseil(conseil, (err, newConseil) => {
      expect(err).toBeNull();
      expect(newConseil).toHaveProperty('Code_Conseils');
      expect(newConseil.Titre).toBe('Test');
      done();
    });
  });

  test('Lecture de tous les conseils', (done) => {
    getAllConseils((err, conseils) => {
      expect(err).toBeNull();
      expect(Array.isArray(conseils)).toBeTruthy();
      done();
    });
  });

  test('Mise à jour d’un conseil', (done) => {
    // D'abord, on crée un conseil à mettre à jour
    const conseil = { Code_Utilisateurs: 3, Titre: 'Ancien Titre', Description: 'Ancienne Desc', Theme: 'Ancien' };
    createConseil(conseil, (err, newConseil) => {
      expect(err).toBeNull();
      const conseilId = newConseil.Code_Conseils;
      // Nouvelle data pour la mise à jour
      const updatedData = {
        Titre: 'Nouveau Titre',
        Description: 'Nouvelle Desc',
        Theme: 'Nouveau',
        Date: new Date().toISOString()
      };
      updateConseil(conseilId, updatedData, (err, updatedRow) => {
        expect(err).toBeNull();
        expect(updatedRow).toHaveProperty('Code_Conseils', conseilId);
        expect(updatedRow.Titre).toBe('Nouveau Titre');
        expect(updatedRow.Description).toBe('Nouvelle Desc');
        expect(updatedRow.Theme).toBe('Nouveau');
        done();
      });
    });
  });

  test('Suppression d’un conseil', (done) => {
    // Création d'un conseil à supprimer
    const conseil = { Code_Utilisateurs: 4, Titre: 'Titre à supprimer', Description: 'Desc', Theme: 'Suppression' };
    createConseil(conseil, (err, newConseil) => {
      expect(err).toBeNull();
      const conseilId = newConseil.Code_Conseils;
      // Suppression du conseil
      deleteConseil(conseilId, (err) => {
        expect(err).toBeNull();
        // Vérification que le conseil a été supprimé via la lecture
        getAllConseils((err, conseils) => {
          expect(err).toBeNull();
          const found = conseils.find(c => c.Code_Conseils === conseilId);
          expect(found).toBeUndefined();
          done();
        });
      });
    });
  });
});
