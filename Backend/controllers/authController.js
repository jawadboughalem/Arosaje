const bcrypt = require('bcrypt');
const { createUser, getUserByEmail } = require('../models/authModel');
const { generateToken } = require('../utils/jwt'); 

const signup = async (req, res) => {
    const { name, surname, email, password, isBotanist } = req.body;
    const botanistValue = isBotanist ? 1 : 0;

    try {
        // Validation des données
        if (!name || !surname || !email || !password) {
            return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Création de l'utilisateur
        const userId = await createUser(name, surname, email, hashedPassword, botanistValue);

        return res.status(201).json({ message: 'Inscription réussie', userId });
    } catch (err) {
        console.error('Erreur lors de l\'inscription:', err.message);
        return res.status(500).json({ error: 'Une erreur est survenue lors de l\'inscription.' });
    }
};
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validation des données
        if (!email || !password) {
            return res.status(400).json({ error: 'Email et mot de passe requis.' });
        }

        // Recherche de l'utilisateur
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ error: 'Email ou mot de passe incorrect.' });
        }

        // Comparaison des mots de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Email ou mot de passe incorrect.' });
        }

        // Génération du token
        const token = generateToken(user.code_utilisateurs); // Assurez-vous que la clé est correcte
        return res.status(200).json({ token });

    } catch (err) {
        console.error('Erreur lors de la connexion:', err.message);
        return res.status(500).json({ error: 'Une erreur est survenue lors de la connexion.' });
    }
};

const logout = (req, res) => {
    res.status(200).json({ message: 'Déconnexion réussie' });
};

module.exports = {
    signup,
    login,
    logout
};
