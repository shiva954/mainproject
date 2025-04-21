const express = require('express');
const router = express.Router();
const { getUserProfile, resetGuestScores } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Protected routes - require authentication
router.get('/profile', protect, getUserProfile);
router.patch('/guest/reset-scores', protect, resetGuestScores);

module.exports = router;