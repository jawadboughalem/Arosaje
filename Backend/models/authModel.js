const { supabase } = require('../config/supabaseClient'); // Configuration de Supabase


// Fonction pour insérer un utilisateur dans la base de données
const createUser = async (name, surname, email, hashedPassword, botanistValue) => {
    try {
        // Données utilisateur
        const userData = {
            nom: name,
            prenom: surname,
            email: email,
            password: hashedPassword,
            botaniste: botanistValue, // Boolean : true ou false
        };

        // Requête d'insertion
        const { data, error } = await supabase
            .from('utilisateurs') // Nom de votre table (vérifiez la casse)
            .insert([userData]) // Insertion d'une ligne
            .select(); // Récupération des données insérées

        console.log('Insert response:', { data, error });

        // Gestion des erreurs
        if (error) {
            throw new Error(`Erreur d'insertion : ${error.message}`);
        }

        // Retourner l'ID de l'utilisateur inséré
        return data[0]?.code_utilisateurs;
    } catch (err) {
        console.error('Erreur inattendue :', err.message);
        throw err;
    }
};

// Fonction pour récupérer un utilisateur à partir de son email
const getUserByEmail = async (email) => {
    try {
        const { data, error } = await supabase
            .from('utilisateurs') // Nom de la table
            .select('*')
            .eq('email', email) // Filtre par email
            .single(); // Récupérer une seule ligne

        console.log('Fetch response:', { data, error });

        // Gestion des erreurs
        if (error) {
            throw new Error(`Erreur de récupération : ${error.message}`);
        }

        return data; // Retourne les données utilisateur
    } catch (err) {
        console.error('Erreur inattendue :', err.message);
        throw err;
    }
};



module.exports = {
    createUser,
    getUserByEmail,
};
