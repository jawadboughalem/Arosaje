const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');

// Route pour créer ou retrouver une conversation
router.post('/conversation', conversationController.createOrFindConversation);

module.exports = router;
