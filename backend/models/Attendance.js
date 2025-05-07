const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Present', 'Absent', 'On Leave'], required: true },
  markedAt: { type: Date }
});

module.exports = mongoose.model('Attendance', attendanceSchema); 