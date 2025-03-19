import { Router } from 'express';
import Thought from '../models/Thought.js';
import mongoose from 'mongoose';

const router = Router();

// ADD a reaction to a thought
router.post('/:thoughtId/reactions', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.thoughtId)) {
    return res.status(400).json({ message: 'Invalid Thought ID format' });
  }
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    );
    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.json(updatedThought);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// REMOVE a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.thoughtId)) {
    return res.status(400).json({ message: 'Invalid Thought ID format' });
  }
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.json(updatedThought);
  } catch (err) {
    return res.status(500).json(err);
  }
});

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
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid Thought ID format' });
  }
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

// UPDATE a thought by ID
router.put('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid Thought ID format' });
  }
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.json(updatedThought);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// DELETE a thought by ID
router.delete('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid Thought ID format' });
  }
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);
    if (!deletedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.json({ message: 'Thought deleted successfully' });
  } catch (err) {
    return res.status(500).json(err);
  }
});

export default router;
