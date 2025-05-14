const express = require('express');
const { createChecklist, getChecklists, deleteChecklist } = require('../controllers/checklist.controller');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();
router.use(auth);
router.post('/', createChecklist);
router.get('/', getChecklists);
router.delete('/:checklistId', deleteChecklist);

module.exports = router;
