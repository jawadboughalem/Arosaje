import { signup } from '../../../controllers/authController';
import { db } from '../../../config/db';
import axios from 'axios';

const portTest = 3000;
const express = require('express');
const appTest = express();
appTest.use(express.json());
appTest.post('/signup', signup);

describe('Test fonction signup avec axios', () => {
    let server;

    beforeAll(async () => {
        server = appTest.listen(portTest);
    });

    afterAll(async () => {
        if (server) {
            await new Promise((resolve) => server.close(resolve));
            console.log("Serveur de test arrêté");
        }
    });
    test('Inscription avec axios', async () => {
        const response = await axios.post(`http://localhost:${portTest}/signup`, {
            name: "Test",
            surname: "Test",
            email: "test@gmail.com",
            password: "1234",
            isBotanist: false
        });

        expect(response.status).toBe(200);
        expect(response.data.message).toBe('Inscription réussie');
        expect(response.data.userId).toBeDefined();
    });
});
