// __tests__/conseilRoutes.test.js
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

// Importation des routes de conseils
const conseilRoutes = require('../routes/conseilRoutes.js');

const app = express();
app.use(bodyParser.json());
app.use('/conseils', conseilRoutes);

// Middleware de simulation d'authentification
app.use((req, res, next) => {
  req.user = { id: 1 }; // Simuler un utilisateur authentifié ayant l'ID 1
  next();
});

describe('Tests d\'Intégration des Endpoints "conseils"', () => {
  let createdConseilId;

  test('POST /conseils/create', async () => {
    const res = await request(app)
      .post('/conseils/create')
      .send({
        Code_Utilisateurs: 1,
        Titre: 'Conseil Test',
        Description: 'Description test',
        Theme: 'Entretien Général'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('Code_Conseils');
    createdConseilId = res.body.Code_Conseils;
  });

  test('GET /conseils', async () => {
    const res = await request(app).get('/conseils/conseils');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
  

  test('PUT /conseils/update/:id', async () => {
    const res = await request(app)
      .put(`/conseils/update/${createdConseilId}`)
      .send({
        Titre: 'Conseil Test Modifié',
        Description: 'Description modifiée',
        Theme: 'Entretien Général',
        Date: new Date().toISOString()
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.Titre).toEqual('Conseil Test Modifié');
  });

  test('DELETE /conseils/delete/:id', async () => {
    const res = await request(app).delete(`/conseils/delete/${createdConseilId}`);
    expect(res.statusCode).toEqual(204);
  });
});
