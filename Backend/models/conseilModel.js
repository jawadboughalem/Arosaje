const { supabase } = require('../config/supabaseClient');

const createConseil = async (conseil) => {
    try {
        const { Code_Utilisateurs, Titre, Description, Theme } = conseil;

        const { data, error } = await supabase
            .from('Conseils')
            .insert({
                Code_Utilisateurs,
                Titre,
                Description,
                Date: new Date().toISOString(),
                Theme
            })
            .select();

        if (error) {
            throw new Error(`Erreur lors de la création du conseil: ${error.message}`);
        }

        return { Code_Conseils: data[0].Code_Conseils, ...conseil, Date: data[0].Date };
    } catch (err) {
        console.error(err.message);
        throw err;
    }
};

const getAllConseils = async () => {
    try {
        const { data, error } = await supabase
            .from('conseils') // En minuscules
            .select('*');

        if (error) {
            throw new Error(`Erreur lors de la récupération des conseils: ${error.message}`);
        }

        return data;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
};



const deleteConseil = async (conseilId) => {
    try {
        const { error } = await supabase
            .from('Conseils')
            .delete()
            .eq('Code_Conseils', conseilId);

        if (error) {
            throw new Error(`Erreur lors de la suppression du conseil: ${error.message}`);
        }
    } catch (err) {
        console.error(err.message);
        throw err;
    }
};

const updateConseil = async (conseilId, updatedConseil) => {
    try {
        const { Titre, Description, Theme } = updatedConseil;

        const { error } = await supabase
            .from('Conseils')
            .update({
                Titre,
                Description,
                Theme
            })
            .eq('Code_Conseils', conseilId);

        if (error) {
            throw new Error(`Erreur lors de la mise à jour du conseil: ${error.message}`);
        }
    } catch (err) {
        console.error(err.message);
        throw err;
    }
};

module.exports = {
    createConseil,
    getAllConseils,
    deleteConseil,
    updateConseil,
};
