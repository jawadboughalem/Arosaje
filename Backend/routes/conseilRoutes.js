const express = require('express');
const router = express.Router();
const conseilController = require('../controllers/conseilController');

router.post('/create', conseilController.createConseil);
router.get('/conseils', conseilController.getAllConseils);

module.exports = router;
