// backend/models/todo.model.js (Updated)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date, required: false },
  // --- NEW: Link to the User who created it ---
  userId: { type: String, required: true }
}, {
  timestamps: true,
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;