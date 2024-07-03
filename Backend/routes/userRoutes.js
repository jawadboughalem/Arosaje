// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const authenticateToken = require('../middlewares/authMiddleware');
const { getUserInfo, changePassword, updateUserProfilePic } = require('../controllers/userController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/user-info', authenticateToken, getUserInfo);
router.post('/change-password', authenticateToken, changePassword);
router.post('/upload-profile-pic', authenticateToken, upload.single('profilePic'), updateUserProfilePic);

module.exports = router;
