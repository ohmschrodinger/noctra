const mongoose = require('mongoose');

const outpassSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Parent', required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  reason: { type: String, required: true },
  destination: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  isUrgent: { type: Boolean, default: false },
  requestedAt: { type: Date, default: Date.now },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, refPath: 'reviewerModel' },
  reviewerModel: { type: String, enum: ['Admin', 'Warden'] },
  reviewedAt: { type: Date }
});

module.exports = mongoose.model('Outpass', outpassSchema); 