const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../models/userModel');
const { secretKey } = require('../config/config');

const signup = async (req, res) => {
    const { name, surname, email, password, isBotanist } = req.body;
    const botanistValue = isBotanist ? 1 : 0;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        createUser(name, surname, email, hashedPassword, botanistValue, (err, userId) => {
            if (err) {
                console.error('Erreur lors de l\'insertion dans la base de données:', err.message);
                return res.status(500).json({ error: 'Erreur lors de l\'inscription' });
            }
            res.status(200).json({ message: 'Inscription réussie', userId });
        });
    } catch (err) {
        console.error('Erreur lors de l\'inscription:', err.message);
        res.status(500).json({ error: 'Erreur lors de l\'inscription' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(`Attempting login for email: ${email}`);

    try {
        getUserByEmail(email, async (err, user) => {
            if (err) {
                console.error('Database error:', err.message);
                return res.status(500).json({ error: 'Erreur lors de la connexion à la base de données' });
            }

            if (!user) {
                console.warn('No user found for email:', email);
                return res.status(400).json({ error: 'Email ou mot de passe incorrect' });
            }

            try {
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    console.warn('Incorrect password for email:', email);
                    return res.status(400).json({ error: 'Email ou mot de passe incorrect' });
                }

                const token = jwt.sign({ userId: user.Code_Utilisateurs }, secretKey, { expiresIn: '30s' });

                console.log('Login successful for user:', user.Code_Utilisateurs);
                res.status(200).json({ token });

            } catch (error) {
                console.error('Error during password comparison:', error.message);
                return res.status(500).json({ error: 'Erreur lors de la comparaison du mot de passe' });
            }
        });

    } catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
};

module.exports = {
    signup,
    login
};
