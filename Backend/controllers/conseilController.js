const Conseil = require('../models/conseilModel');

const createConseil = (req, res) => {
  const conseil = req.body;
  Conseil.create(conseil, (err, newConseil) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json(newConseil);
    }
  });
};

const getAllConseils = (req, res) => {
  Conseil.getAll((err, conseils) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(conseils);
    }
  });
};

module.exports = {
  createConseil,
  getAllConseils
};
