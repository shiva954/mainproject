const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  duration: { type: Number, required: true },
  participants: { type: String },
  roomID: { type: String, unique: true },
  description: { type: String },
});

module.exports = mongoose.model('Meeting', MeetingSchema);
