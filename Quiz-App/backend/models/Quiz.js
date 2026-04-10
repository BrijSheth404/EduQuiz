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