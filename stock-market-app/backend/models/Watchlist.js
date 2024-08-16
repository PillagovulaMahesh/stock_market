// backend/models/Watchlist.js

const mongoose = require('mongoose');

// Define the Watchlist schema
const WatchlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  stocks: [
    {
      symbol: {
        type: String,
        required: true,
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

// Create a model from the schema
const Watchlist = mongoose.model('Watchlist', WatchlistSchema);

module.exports = Watchlist;
