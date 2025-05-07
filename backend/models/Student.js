const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  prn: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  hostelBlock: { type: String, required: true },
  year: { type: Number, required: true },
  degree: { type: String, default: 'BTech' },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Parent', required: false },
  firebaseUid: { type: String, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Student', studentSchema); 