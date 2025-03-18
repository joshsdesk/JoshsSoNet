import { Router } from 'express';
import Thought from '../models/Thought.js';

const router = Router();

// GET all thoughts
router.get('/', async (_req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a thought
router.post('/', async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    res.json(newThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET single thought by ID
router.get('/:id', async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      return res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  });

export default router;
