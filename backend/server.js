require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const mongoose = require('mongoose');
const meetingRoutes = require('./routes/meetings');
// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// In server.js, update the createGuestUser function
const createGuestUser = async () => {
  try {
    const guestEmail = "guest@gmail.com";
    console.log("Checking for guest user...");
    const existingGuest = await User.findOne({ email: guestEmail });
    
    if (!existingGuest) {
      console.log("Guest user not found, creating new guest account...");
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("123456", salt);
      
      await User.create({
        name: "Guest User",
        email: guestEmail,
        password: hashedPassword
      });
      
      console.log("Guest account created successfully");
    } else {
      console.log("Guest account already exists");
    }
  } catch (error) {
    console.error("Error creating guest account:", error);
  }
};
// Call the function when server starts
createGuestUser();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/meetings', meetingRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Connect Meet API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});