const Conversation = require('../models/conversationModel');

exports.createOrFindConversation = (req, res) => {
  const { ownerId, expediteurId } = req.body;

  Conversation.findOrCreateConversation(ownerId, expediteurId, (err, conversation) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la gestion de la conversation' });
    }
    res.json({ conversationId: conversation.Code_Conversation });
  });
};
