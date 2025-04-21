const express = require('express');
const router = express.Router();
const { registerUser, loginUser, googleAuth } = require('../controllers/authController');

// Registration route
router.post('/signup', registerUser);

// Login route
router.post('/login', loginUser);

// Google authentication route
router.post('/google', googleAuth);

module.exports = router;