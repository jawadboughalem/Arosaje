const bcrypt = require('bcrypt');
const { createUser, getUserByEmail } = require('../models/authModel');
const { generateToken } = require('../utils/jwt'); // Assurez-vous que le chemin est correct

const signup = async (req, res) => {
    const { name, surname, email, password, isBotanist } = req.body;
    const botanistValue = isBotanist ? 1 : 0;

    console.log('Starting signup process');
    console.log(`Received data: name=${name}, surname=${surname}, email=${email}, botanist=${botanistValue}`);

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Password hashed successfully');
        
        createUser(name, surname, email, hashedPassword, botanistValue, (err, userId) => {
            if (err) {
                console.error('Database insertion error:', err.message);
                return res.status(500).json({ error: 'Erreur lors de l\'insertion dans la base de données', details: err.message });
            }
            console.log('User created successfully with ID:', userId);
            res.status(200).json({ message: 'Inscription réussie', userId });
        });
    } catch (err) {
        console.error('Error during signup:', err.message);
        res.status(500).json({ error: 'Erreur lors de l\'inscription', details: err.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(`Attempting login for email: ${email}`);

    try {
        getUserByEmail(email, async (err, user) => {
            if (err) {
                console.error('Database error:', err.message);
                return res.status(500).json({ error: 'Erreur lors de la connexion à la base de données', details: err.message });
            }

            if (!user) {
                console.warn('No user found for email:', email);
                return res.status(400).json({ error: 'Email ou mot de passe incorrect' });
            }

            console.log('User found:', user);
            console.log('Comparing passwords:', password, user.password);

            try {
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    console.warn('Incorrect password for email:', email);
                    return res.status(400).json({ error: 'Email ou mot de passe incorrect' });
                }

                const token = generateToken(user.Code_Utilisateurs);
                console.log('Token generated:', token);

                console.log('Login successful for user:', user.Code_Utilisateurs);
                res.status(200).json({ token }); // Assurez-vous que le token est envoyé ici

            } catch (error) {
                console.error('Error during password comparison:', error.message);
                return res.status(500).json({ error: 'Erreur lors de la comparaison du mot de passe', details: error.message });
            }
        });

    } catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).json({ error: 'Erreur lors de la connexion', details: error.message });
    }
};

module.exports = {
    signup,
    login
};