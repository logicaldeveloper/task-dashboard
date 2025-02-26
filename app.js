const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Task = require('./models/Task');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/task-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes

// Home Page (Dashboard)
app.get('/', async (req, res) => {
  const tasks = await Task.find().sort({ status: 1 });
  res.render('index', { tasks });
});

// Add Task Form
app.get('/add-task', (req, res) => {
  res.render('add-task');
});

// Add Task (POST)
app.post('/add-task', async (req, res) => {
  const { title, description, assignee, reminder } = req.body;
  const task = new Task({
    title,
    description,
    assignee: assignee || '', // Default to empty string if not provided
    reminder: reminder ? new Date(reminder) : null, // Convert to Date object
  });
  await task.save();
  res.redirect('/');
});

// Update Assignee or Reminder
app.post('/edit-task/:id', async (req, res) => {
  const { id } = req.params;
  const { assignee, reminder } = req.body;
  await Task.findByIdAndUpdate(id, {
    assignee: assignee || '',
    reminder: reminder ? new Date(reminder) : null,
  });
  res.redirect('/');
});

// Edit Task Form
app.get('/edit-task/:id', async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  res.render('edit-task', { task });
});

// Update Task Status
app.post('/update-task/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  await Task.findByIdAndUpdate(id, { status });
  res.redirect('/');
});

const cron = require('node-cron');

// Check for reminders every minute
cron.schedule('* * * * *', async () => {
  const now = new Date();
  const tasksWithReminders = await Task.find({
    reminder: { $lte: now }, // Find tasks with reminders due now or earlier
    status: { $ne: 'Completed' }, // Exclude completed tasks
  });

  tasksWithReminders.forEach(task => {
    console.log(`Reminder: Task "${task.title}" is due!`);
    // You can send an email or notification here using libraries like nodemailer
  });

  // Clear reminders after notifying
  await Task.updateMany(
    { _id: { $in: tasksWithReminders.map(task => task._id) } },
    { reminder: null }
  );
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});