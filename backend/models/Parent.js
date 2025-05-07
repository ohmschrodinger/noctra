const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  childId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: false },
  firebaseUid: { type: String, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Parent', parentSchema); 