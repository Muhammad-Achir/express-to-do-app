const Checklist = require('../models/checklist.model');

// Get checklists for logged-in user
exports.getChecklists = async (req, res) => {
  const checklists = await Checklist.find({ userId: req.user.id });
  res.json(checklists);
};

// Create checklist with userId
exports.createChecklist = async (req, res) => {
  const { name } = req.body;
  const checklist = await Checklist.create({ name, userId: req.user.id });
  res.status(201).json(checklist);
};

// Delete checklist, but only if it belongs to user
exports.deleteChecklist = async (req, res) => {
  const result = await Checklist.findOneAndDelete({ _id: req.params.checklistId, userId: req.user.id });
  if (!result) return res.status(403).json({ message: 'Not authorized or checklist not found' });
  res.json({ message: 'Checklist deleted' });
};
