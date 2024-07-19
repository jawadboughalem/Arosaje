const Message = require('../models/message');

exports.createMessage = (req, res) => {
  const newMessage = {
    Code_Expediteur: req.body.Code_Expediteur,
    Code_Destinataire: req.body.Code_Destinataire,
    Message: req.body.Message,
    DateEnvoi: new Date().toISOString(),
  };

  Message.create(newMessage, (err, message) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(201).send(message);
  });
};

exports.getMessages = (req, res) => {
  Message.getAll((err, messages) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).send(messages);
  });
};
