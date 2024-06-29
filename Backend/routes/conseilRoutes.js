const express = require('express');
const router = express.Router();
const conseilController = require('../controllers/conseilController');

router.post('/conseils', conseilController.createConseil);
router.get('/conseils', conseilController.getAllConseils);

module.exports = router;
