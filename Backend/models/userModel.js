const { supabase } = require('../config/supabaseClient');

const getUserById = async (userId) => {
    try {
        const { data, error } = await supabase
            .from('utilisateurs')
            .select('*')
            .eq('Code_Utilisateurs', userId)
            .single();

        if (error) {
            throw new Error(`Erreur lors de la récupération de l'utilisateur: ${error.message}`);
        }

        return data;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
};

const getUserInfoFromDb = async (userId) => {
    try {
        const { data, error } = await supabase
            .from('utilisateurs')
            .select('nom, prenom')
            .eq('Code_Utilisateurs', userId)
            .single();

        if (error) {
            throw new Error(`Erreur lors de la récupération des informations utilisateur: ${error.message}`);
        }

        return data || null;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
};

const updateUserPassword = async (userId, hashedPassword) => {
    try {
        const { error } = await supabase
            .from('utilisateurs')
            .update({ password: hashedPassword })
            .eq('Code_Utilisateurs', userId);

        if (error) {
            throw new Error(`Erreur lors de la mise à jour du mot de passe: ${error.message}`);
        }
    } catch (err) {
        console.error(err.message);
        throw err;
    }
};

const updateUserPhoto = async (id, fileName) => {
    try {
        const { error } = await supabase
            .from('utilisateurs')
            .update({ photo: fileName })
            .eq('Code_Utilisateurs', id);

        if (error) {
            throw new Error(`Erreur lors de la mise à jour de la photo: ${error.message}`);
        }
    } catch (err) {
        console.error(err.message);
        throw err;
    }
};

const getUserPhoto = async (id) => {
    try {
        const { data, error } = await supabase
            .from('utilisateurs')
            .select('photo')
            .eq('Code_Utilisateurs', id)
            .single();

        if (error) {
            throw new Error(`Erreur lors de la récupération de la photo: ${error.message}`);
        }

        return data ? data.photo : null;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
};

const isUserBotanist = async (userId) => {
    try {
        const { data, error } = await supabase
            .from('utilisateurs')
            .select('botaniste')
            .eq('Code_Utilisateurs', userId)
            .single();

        if (error) {
            throw new Error(`Erreur lors de la récupération du statut de botaniste: ${error.message}`);
        }

        return data ? data.botaniste : null;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
};

module.exports = {
    getUserById,
    updateUserPassword,
    getUserInfoFromDb,
    updateUserPhoto,
    getUserPhoto,
    isUserBotanist,
};
