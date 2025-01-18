const { supabase } = require('../config/supabaseClient');

const createAnnonce = async (annonce) => {
    try {
        const { nomPlante, description, localisation, dateDebut, dateFin, photo, userId } = annonce;

        // Insertion dans la table "postes"
        const { data: postData, error: postError } = await supabase
            .from('postes')
            .insert({
                code_utilisateurs: userId,
                titre: nomPlante,
                description,
                datePoste: new Date(),
                localisation
            })
            .select();

        if (postError) {
            throw new Error(`Erreur lors de la création de l'annonce: ${postError.message}`);
        }

        const postId = postData[0].Code_Postes;

        // Insertion de la photo liée à l'annonce
        const { data: photoData, error: photoError } = await supabase
            .from('photos')
            .insert({
                date: new Date().getTime(),
                photo,
                code_utilisateurs: userId,
                code_Postes: postId
            })
            .select();

        if (photoError) {
            throw new Error(`Erreur lors de l'ajout de la photo: ${photoError.message}`);
        }

        const photoId = photoData[0].code_Photos;

        // Mise à jour de l'annonce avec l'ID de la photo
        const { error: updatePostError } = await supabase
            .from('postes')
            .update({ code_Photos: photoId })
            .eq('Code_Postes', postId);

        if (updatePostError) {
            throw new Error(`Erreur lors de la mise à jour de l'annonce: ${updatePostError.message}`);
        }

        // Insertion des détails de garde associés à l'annonce
        const { error: gardeError } = await supabase
            .from('Gardes')
            .insert({
                Code_Postes: postId,
                Code_Gardien: userId,
                Statut: 'Disponible',
                DateDebut: dateDebut,
                DateFin: dateFin
            });

        if (gardeError) {
            throw new Error(`Erreur lors de l'ajout des détails de garde: ${gardeError.message}`);
        }

        return postId;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
};

const getAllAnnonces = async () => {
    try {
      const { data, error } = await supabase
        .from('postes')
        .select(`
          code_postes,
          titre,
          description,
          dateposte,
          localisation,
          photos (photo),
          gardes (datedebut, datefin, statut)
        `)
        .order('dateposte', { ascending: false });
  
      if (error) {
        console.error('Erreur lors de la récupération des annonces:', error.message);
        throw new Error(`Erreur lors de la récupération des annonces: ${error.message}`);
      }
  
      // Adapter la structure pour refléter les résultats aplatis
      return data.map(row => ({
        codePostes: row.code_postes,
        titre: row.titre,
        description: row.description,
        datePoste: row.dateposte,
        localisation: row.localisation,
        photo: row.photo || null, // Photo associée, ou null si absente
        garde: {
          statut: row.gardes?.statut || null,
          dateDebut: row.gardes?.datedebut ? new Date(row.gardes.datedebut) : null,
          dateFin: row.gardes?.datefin ? new Date(row.gardes.datefin) : null,
        },
      }));
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  };
  
  
  

  const getAnnoncesByUser = async (userId) => {
    try {
        const { data, error } = await supabase
            .from('postes')
            .select(`
                code_postes, 
                titre, 
                description, 
                dateposte, 
                localisation, 
                photos:code_photos(photo), 
                gardes:code_postes(datedebut, datefin)
            `)
            .eq('code_utilisateurs', userId)
            .order('dateposte', { ascending: false });

        if (error) {
            throw new Error(`Erreur lors de la récupération des annonces par utilisateur: ${error.message}`);
        }

        // Format des dates et structure du résultat
        return data.map(row => ({
            code_postes: row.code_postes,
            titre: row.titre,
            description: row.description,
            dateposte: row.dateposte ? new Date(row.dateposte) : null,
            localisation: row.localisation,
            photos: row.photos ? row.photos.map(photo => photo.photo) : [],
            gardes: row.gardes ? row.gardes.map(guard => ({
                datedebut: guard.datedebut ? new Date(guard.datedebut) : null,
                datefin: guard.datefin ? new Date(guard.datefin) : null,
            })) : [],
        }));
    } catch (err) {
        console.error(err.message);
        throw err;
    }
};


module.exports = {
    createAnnonce,
    getAllAnnonces,
    getAnnoncesByUser,
};
