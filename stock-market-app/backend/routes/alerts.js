// backend/models/Alert.js

const mongoose = require('mongoose');

// Define the Alert schema
const AlertSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  targetPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  notified: {
    type: Boolean,
    default: false,
  },
});

// Create a model from the schema
const Alert = mongoose.model('Alert', AlertSchema);

module.exports = Alert;
