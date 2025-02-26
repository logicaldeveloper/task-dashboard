const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Completed'],
    default: 'To Do'
  },
  assignee: { type: String, default: '' }, // New field for task assignee
  reminder: { type: Date, default: null }, // New field for reminder
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', taskSchema);