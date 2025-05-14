const Item = require('../models/item.model');
const { verifyChecklistOwnership } = require('../utils/authorization');

exports.getItems = async (req, res) => {
  const authorized = await verifyChecklistOwnership(req.user.id, req.params.checklistId);
  if (!authorized) return res.status(403).json({ message: 'Not authorized' });

  const items = await Item.find({ checklistId: req.params.checklistId });
  res.json(items);
};

exports.createItem = async (req, res) => {
  const authorized = await verifyChecklistOwnership(req.user.id, req.params.checklistId);
  if (!authorized) return res.status(403).json({ message: 'Not authorized' });

  const { itemName } = req.body;
  const item = await Item.create({ itemName, checklistId: req.params.checklistId });
  res.status(201).json(item);
};

exports.getItem = async (req, res) => {
  const authorized = await verifyChecklistOwnership(req.user.id, req.params.checklistId);
  if (!authorized) return res.status(403).json({ message: 'Not authorized' });

  const item = await Item.findOne({ _id: req.params.checklistItemId, checklistId: req.params.checklistId });
  if (!item) return res.status(404).json({ message: 'Item not found' });

  res.json(item);
};

exports.updateItem = async (req, res) => {
  const authorized = await verifyChecklistOwnership(req.user.id, req.params.checklistId);
  if (!authorized) return res.status(403).json({ message: 'Not authorized' });

  try {
    const item = await Item.findOne({
      _id: req.params.checklistItemId,
      checklistId: req.params.checklistId
    });

    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.isCompleted = !item.isCompleted;
    await item.save();

    res.json({ message: 'Item updated', item });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.renameItem = async (req, res) => {
  const authorized = await verifyChecklistOwnership(req.user.id, req.params.checklistId);
  if (!authorized) return res.status(403).json({ message: 'Not authorized' });

  const { itemName } = req.body;
  const item = await Item.findOneAndUpdate(
    { _id: req.params.checklistItemId, checklistId: req.params.checklistId },
    { itemName },
    { new: true }
  );
  if (!item) return res.status(404).json({ message: 'Item not found' });

  res.json(item);
};

exports.deleteItem = async (req, res) => {
  const authorized = await verifyChecklistOwnership(req.user.id, req.params.checklistId);
  if (!authorized) return res.status(403).json({ message: 'Not authorized' });

  const result = await Item.findOneAndDelete({
    _id: req.params.checklistItemId,
    checklistId: req.params.checklistId
  });

  if (!result) return res.status(404).json({ message: 'Item not found' });

  res.json({ message: 'Item deleted' });
};
