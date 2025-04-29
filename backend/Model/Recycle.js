const mongoose = require('mongoose');

const recycleSchema = new mongoose.Schema({
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  transferredAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recycle', recycleSchema);
