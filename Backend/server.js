const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { db, initialize } = require('./config/db.js');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const secretKey = 'b57f6ae9a3d1c4f8e9d3e7a9b7c1f4e5d6a8c7f2b3d5a7c6e8f9b0d3c2a4e7f6'; // Vous devez définir une clé secrète pour signer les jetons JWT

initialize();

app.use(bodyParser.json());

// Route pour l'inscription
app.post('/signup', async (req, res) => {
    const { name, surname, email, password, isBotanist } = req.body;
    const botanistValue = isBotanist ? 1 : 0;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `INSERT INTO utilisateurs (nom, prenom, email, password, botaniste) VALUES (?, ?, ?, ?, ?)`;
        db.run(query, [name, surname, email, hashedPassword, botanistValue], function(err) {
            if (err) {
                console.error('Erreur lors de l\'insertion dans la base de données:', err.message);
                return res.status(500).json({ error: 'Erreur lors de l\'inscription' });
            }
            res.status(200).json({ message: 'Inscription réussie', userId: this.lastID });
        });
    } catch (err) {
        console.error('Erreur lors de l\'inscription:', err.message);
        res.status(500).json({ error: 'Erreur lors de l\'inscription' });
    }
});

// Route pour la connexion
// Route pour la connexion
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(`Attempting login for email: ${email}`);

    try {
        const query = `SELECT * FROM utilisateurs WHERE email = ?`;
        db.get(query, [email], async (err, row) => {
            if (err) {
                console.error('Database error:', err.message);
                return res.status(500).json({ error: 'Erreur lors de la connexion à la base de données' });
            }

            if (!row) {
                console.warn('No user found for email:', email);
                return res.status(400).json({ error: 'Email ou mot de passe incorrect' });
            }

            try {
                const isPasswordValid = await bcrypt.compare(password, row.password);
                if (!isPasswordValid) {
                    console.warn('Incorrect password for email:', email);
                    return res.status(400).json({ error: 'Email ou mot de passe incorrect' });
                }

                const token = jwt.sign({ userId: row.id }, secretKey, { expiresIn: '1H' });

                console.log('Login successful for user:', row.id);
                res.status(200).json({ token }); // Envoi du token JWT

            } catch (error) {
                console.error('Error during password comparison:', error.message);
                return res.status(500).json({ error: 'Erreur lors de la comparaison du mot de passe' });
            }
        });


    } catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
// Route pour récupérer les informations de l'utilisateur
// Route pour récupérer les informations de l'utilisateur
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;

    const query = `SELECT nom, prenom FROM utilisateurs WHERE Code_Utilisateurs = ?`;
    db.get(query, [userId], (err, row) => {
        if (err) {
            console.error('Erreur lors de la récupération des informations de l\'utilisateur:', err.message);
            return res.status(500).json({ error: 'Erreur lors de la récupération des informations de l\'utilisateur' });
        }

        if (!row) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        res.status(200).json(row);
    });
});

});




app.listen(port, '0.0.0.0', () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
