const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.error('Auth error:', err);
    res.status(401).json({ message: 'Please authenticate' });
  }
};

// Get all todos for a user
router.get('/', auth, async (req, res) => {
  try {
    console.log('Fetching todos for user:', req.userId);
    const todos = await Todo.find({ user: req.userId }).sort({ createdAt: -1 });
    console.log('Found todos:', todos.length);
    res.json(todos);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ message: 'Error fetching todos' });
  }
});

// Create a new todo
router.post('/', auth, async (req, res) => {
  try {
    console.log('Creating todo for user:', req.userId);
    const todo = new Todo({
      ...req.body,
      user: req.userId
    });
    await todo.save();
    console.log('Todo created:', todo);
    res.status(201).json(todo);
  } catch (err) {
    console.error('Error creating todo:', err);
    res.status(400).json({ message: 'Error creating todo' });
  }
});

// Update a todo
router.patch('/:id', auth, async (req, res) => {
  try {
    console.log('Updating todo:', req.params.id, 'for user:', req.userId);
    const todo = await Todo.findOne({ _id: req.params.id, user: req.userId });
    if (!todo) {
      console.log('Todo not found or unauthorized');
      return res.status(404).json({ message: 'Todo not found' });
    }

    Object.assign(todo, req.body);
    await todo.save();
    console.log('Todo updated:', todo);
    res.json(todo);
  } catch (err) {
    console.error('Error updating todo:', err);
    res.status(400).json({ message: 'Error updating todo' });
  }
});

// Delete a todo
router.delete('/:id', auth, async (req, res) => {
  try {
    console.log('Deleting todo:', req.params.id, 'for user:', req.userId);
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!todo) {
      console.log('Todo not found or unauthorized');
      return res.status(404).json({ message: 'Todo not found' });
    }
    console.log('Todo deleted:', todo);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).json({ message: 'Error deleting todo' });
  }
});

module.exports = router; 