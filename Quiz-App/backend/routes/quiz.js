const express  = require('express');
const Quiz     = require('../models/Quiz');
const Result   = require('../models/Result');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router   = express.Router();

// GET all active quizzes — GET /api/quiz
router.get('/', protect, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ status: 'active' }).select('-questions.correct');
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET single quiz by ID — GET /api/quiz/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// CREATE quiz — POST /api/quiz (admin only)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { title, topic, difficulty, questions } = req.body;
    const quiz = await Quiz.create({
      title, topic, difficulty, questions,
      createdBy: req.user.id,
    });
    res.status(201).json({ message: 'Quiz created', quiz });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// UPDATE quiz — PUT /api/quiz/:id (admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json({ message: 'Quiz updated', quiz });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE quiz — DELETE /api/quiz/:id (admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json({ message: 'Quiz deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// SUBMIT quiz result — POST /api/quiz/submit
router.post('/submit', protect, async (req, res) => {
  try {
    const { score, total, topic, answers } = req.body;

    // Save result to MongoDB
    const result = await Result.create({
      user: req.user.id,
      topic,
      score,
      total,
      answers,
    });

    res.json({
      message: 'Quiz submitted successfully',
      score,
      total,
      percentage: Math.round((score / total) * 100),
      resultId: result._id,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET all results for logged in user — GET /api/quiz/my-results
router.get('/my-results', protect, async (req, res) => {
  try {
    const results = await Result.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
