const Conseil = require('../models/conseilModel');

const createConseil = async (req, res) => {
  try {
    const conseil = req.body;
    const newConseil = await Conseil.createConseil(conseil);
    res.status(201).json(newConseil);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllConseils = async (req, res) => {
  try {
    const conseils = await Conseil.getAllConseils();
    res.json(conseils); // Renvoie la liste des conseils
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteConseil = async (req, res) => {
  try {
    const { id } = req.params;
    await Conseil.deleteConseil(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateConseil = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedConseil = req.body;
    await Conseil.updateConseil(id, updatedConseil);
    res.status(200).json({ message: 'Conseil mis à jour avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createConseil,
  getAllConseils,
  deleteConseil,
  updateConseil, 
};
