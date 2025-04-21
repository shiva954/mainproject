const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Reset guest user scores
// @route   PATCH /api/users/guest/reset-scores
// @access  Private
const resetGuestScores = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Here you would reset any user scores or data
    // This is just a placeholder - modify as needed for your app
    
    res.json({ success: true, message: 'Guest scores reset successfully' });
  } catch (error) {
    console.error('Reset scores error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUserProfile, resetGuestScores };