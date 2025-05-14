const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  checklistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Checklist', required: true }
});

module.exports = mongoose.model('Item', itemSchema);
