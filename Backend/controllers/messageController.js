// controllers/messageController.js
const Message = require('../models/messageModel');

const createMessage = (req, res) => {
  const message = {
    codeExpediteur: req.body.codeExpediteur,
    codeDestinataire: req.body.codeDestinataire,
    messageText: req.body.messageText,
    dateEnvoi: new Date().toISOString()
  };

  Message.create(message, (err, newMessage) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(newMessage);
  });
};

const getAllMessages = (req, res) => {
  const userId = req.params.userId;

  Message.getAll(userId, (err, messages) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(messages);
  });
};

const getMessagesByConversation = (req, res) => {
  const userId = req.params.userId;
  const annonceId = req.params.annonceId;

  console.log(userId, annonceId)

  Message.getByConversation(userId, annonceId, (err, messages) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(messages);
  });
};

module.exports = {
  createMessage,
  getAllMessages,
  getMessagesByConversation
};