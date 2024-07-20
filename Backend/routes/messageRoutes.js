// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/', messageController.createMessage);
router.get('/:userId', messageController.getAllMessages);
router.get('/:userId/:annonceId', messageController.getMessagesByConversation);

module.exports = router;
