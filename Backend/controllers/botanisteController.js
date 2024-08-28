const { checkIfBotanist } = require('../models/botanisteModel');

const isBotanist = (req, res) => {
  const userId = req.userId; // Assurez-vous que l'userId est correctement récupéré (authentification, middleware)

  checkIfBotanist(userId, (err, botaniste) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la vérification du statut de botaniste' });
    }
    if (botaniste === null) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    // Assurez-vous que `botaniste` est un boolean ou peut être converti en boolean
    res.status(200).json({ isBotanist: botaniste === 1 }); 
  });
};

module.exports = {
  isBotanist,
};
