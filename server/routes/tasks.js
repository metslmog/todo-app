import express from 'express';
import Task from '../models/Task.js';
const router = express.Router();

// GET all tasks
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// GET /api/tasks?completed=false
router.get('/', async (req, res) => {
    const { completed } = req.query;
    try {
        const filter = {};
        if (completed === 'false') {
            filter.completed = false;
        }
        const tasks = await Task.find(filter);
        res.json(tasks);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// POST a new task
router.post('/', async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const saved = await newTask.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT update a task
router.put('/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE a task
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;