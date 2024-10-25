const Conversation = require('../models/conversationModel');

exports.createOrFindConversation = (req, res) => {
  const { ownerId, expediteurId } = req.body;

  Conversation.findOrCreateConversation(ownerId, expediteurId, (err, conversation) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la gestion de la conversation' });
    }

    console.log("conversation.Code_Conversation :", conversation.Code_Conversation);

    if (conversation && conversation.Code_Conversation) {
      res.json({ conversationId: conversation.Code_Conversation });
    } else {
      console.error("Conversation ID not found, objet conversation :", conversation);
      res.status(500).json({ error: 'Conversation ID not found' });
    }
  });
};
