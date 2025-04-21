const express = require('express');
const Meeting = require('../models/Meeting');

const router = express.Router();

// Generate a random Room ID
const generateRoomID = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

// Create a new meeting
router.post('/create', async (req, res) => {
  try {
    const { title, date, time, duration, participants, description } = req.body;
    const roomID = generateRoomID();
    
    const newMeeting = new Meeting({ title, date, time, duration, participants, roomID, description });
    await newMeeting.save();
    
    res.status(201).json({ success: true, meeting: newMeeting });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all meetings
router.get('/', async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.status(200).json({ success: true, meetings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete a meeting by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedMeeting = await Meeting.findByIdAndDelete(req.params.id);
    if (!deletedMeeting) return res.status(404).json({ success: false, message: 'Meeting not found' });
    res.status(200).json({ success: true, message: 'Meeting deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get a meeting by Room ID
router.get('/join/:roomID', async (req, res) => {
  try {
    const meeting = await Meeting.findOne({ roomID: req.params.roomID });
    if (!meeting) return res.status(404).json({ success: false, message: 'Meeting not found' });
    res.status(200).json({ success: true, meeting });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
