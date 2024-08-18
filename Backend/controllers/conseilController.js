const Conseil = require('../models/conseilModel');

const createConseil = (req, res) => {
  const conseil = req.body;
  Conseil.createConseil(conseil, (err, newConseil) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json(newConseil);
    }
  });
};

const getAllConseils = (req, res) => {
  Conseil.getAllConseils((err, conseils) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      console.log('Conseils renvoyés:', conseils);
      res.json(conseils);
    }
  });
};

const deleteConseil = (req, res) => {
  const { id } = req.params;
  Conseil.deleteConseil(id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(204).send();
    }
  });
};

module.exports = {
  createConseil,
  getAllConseils,
  deleteConseil,
};
