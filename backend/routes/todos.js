// backend/routes/todos.js (Protected Version)

const router = require('express').Router();
const auth = require('../middleware/auth'); // Import our auth middleware
let Todo = require('../models/todo.model');

// --- All routes below this are now protected ---

// GET all todos for the logged-in user
router.get('/', auth, async (req, res) => {
  // Find all todos where the userId matches the logged-in user's id
  const todos = await Todo.find({ userId: req.user });
  res.json(todos);
});

// ADD a new todo for the logged-in user
router.post('/add', auth, (req, res) => {
  const { text, dueDate } = req.body;
  const newTodo = new Todo({
    text,
    dueDate,
    userId: req.user // Attach the user's ID
  });
  newTodo.save()
    .then(() => res.json('Todo added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE a todo (and check if it belongs to the user)
router.delete('/:id', auth, async (req, res) => {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.user });
    if (!todo) return res.status(404).json({ msg: 'Todo not found or user not authorized.'});

    await Todo.findByIdAndDelete(req.params.id);
    res.json('Todo deleted.');
});

// UPDATE completion status (and check if it belongs to the user)
router.post('/:id/update', auth, async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (todo.userId !== req.user) return res.status(401).json({ msg: 'User not authorized.'});

    todo.completed = !todo.completed;
    await todo.save();
    res.json('Todo updated!');
});

// EDIT text (and check if it belongs to the user)
router.post('/:id/edit', auth, async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (todo.userId !== req.user) return res.status(401).json({ msg: 'User not authorized.'});

    todo.text = req.body.text;
    await todo.save();
    res.json('Todo text updated!');
});

// CLEAR all completed todos for the logged-in user
router.delete('/completed/clear', auth, async (req, res) => {
    const result = await Todo.deleteMany({ userId: req.user, completed: true });
    res.json(`${result.deletedCount} completed todos deleted.`);
});

module.exports = router;