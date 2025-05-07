const mongoose = require('mongoose');

const guardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  hostelBlock: { type: String, required: true },
  firebaseUid: { type: String, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('Guard', guardSchema); 