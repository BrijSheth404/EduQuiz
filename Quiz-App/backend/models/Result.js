const mongoose = require('mongoose');
const resultSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  topic:   { type: String, required: true },
  score:   { type: Number, required: true },
  total:   { type: Number, required: true },
  answers: { type: Array },
}, { timestamps: true });
module.exports = mongoose.model('Result', resultSchema);
