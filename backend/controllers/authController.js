const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });
    
    // Return success without token
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Generate token
    const token = generateToken(user._id);
    
    // Return user info without password
    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// @desc    Google authentication
// @route   POST /api/auth/google
// @access  Public
const googleAuth = async (req, res) => {
  try {
    const { name, email, image } = req.body;
    
    // Find or create user
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user if doesn't exist
      user = await User.create({
        name,
        email,
        image,
        isGoogleUser: true
      });
    } else if (!user.isGoogleUser) {
      // Update existing user to include Google info
      user.isGoogleUser = true;
      user.image = image || user.image;
      await user.save();
    }
    
    // Generate token
    const token = generateToken(user._id);
    
    // Return user info
    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image
      }
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ message: 'Server error during Google authentication' });
  }
};

module.exports = { registerUser, loginUser, googleAuth };