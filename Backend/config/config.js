const supabase = require('./supabaseClient');

const IPV4 = '192.168.1.25'; // Adresse IP de ton serveur
const secretKey = 'clesecrete';

module.exports = {
    IPV4,
    secretKey,
    supabase, // Ajout de Supabase pour une utilisation centralisée
};