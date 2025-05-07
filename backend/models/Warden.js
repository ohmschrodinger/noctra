const mongoose = require('mongoose');

const wardenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  hostelBlock: { type: String, required: true },
  firebaseUid: { type: String, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Warden', wardenSchema); 