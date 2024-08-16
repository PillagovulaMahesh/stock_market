// backend/models/Stock.js

const mongoose = require('mongoose');

// Define the Stock schema
const StockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  currentPrice: {
    type: Number,
    required: true,
  },
  openPrice: {
    type: Number,
  },
  closePrice: {
    type: Number,
  },
  highPrice: {
    type: Number,
  },
  lowPrice: {
    type: Number,
  },
  volume: {
    type: Number,
  },
  marketCap: {
    type: Number,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

// Create a model from the schema
const Stock = mongoose.model('Stock', StockSchema);

module.exports = Stock;
