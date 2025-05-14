const express = require('express');
const authRoutes = require('./routes/auth.routes');
const checklistRoutes = require('./routes/checklist.routes');
const itemRoutes = require('./routes/item.routes');

const app = express();
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', authRoutes);
app.use('/api/checklist', checklistRoutes);
app.use('/api/checklist', itemRoutes);

module.exports = app;
