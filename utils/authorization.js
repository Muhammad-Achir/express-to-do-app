// utils/authorization.js
const Checklist = require('../models/checklist.model');

exports.verifyChecklistOwnership = async (userId, checklistId) => {
  const checklist = await Checklist.findOne({ _id: checklistId, userId });
  return !!checklist;
};
