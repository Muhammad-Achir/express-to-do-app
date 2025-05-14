const express = require('express');
const {
  getItems, createItem, getItem, updateItem,
  renameItem, deleteItem
} = require('../controllers/item.controller');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();
router.use(auth);
router.get('/:checklistId/item', getItems);
router.post('/:checklistId/item', createItem);
router.get('/:checklistId/item/:checklistItemId', getItem);
router.put('/:checklistId/item/:checklistItemId', updateItem);
router.put('/:checklistId/item/rename/:checklistItemId', renameItem);
router.delete('/:checklistId/item/:checklistItemId', deleteItem);

module.exports = router;
