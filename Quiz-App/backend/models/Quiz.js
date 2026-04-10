const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options:  { type: [String], required: true },
  correct:  { type: Number, required: true },
});

const quizSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  topic:      { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy' },
  questions:  [questionSchema],
  status:     { type: String, enum: ['active', 'draft'], default: 'active' },
  createdBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
const Result = require('../models/Result');

router.post('/submit', protect, async (req, res) => {
  try {
    const { score, total, topic, answers } = req.body;
    const result = await Result.create({
      user: req.user.id,
      topic, score, total, answers
    });
    res.json({
      message: 'Quiz submitted successfully',
      score,
      total,
      percentage: Math.round((score / total) * 100),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
