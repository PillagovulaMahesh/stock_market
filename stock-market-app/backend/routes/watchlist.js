// backend/routes/watchlist.js

const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Watchlist = require('../models/Watchlist');
const User = require('../models/User');

const router = express.Router();

// @route   POST /api/watchlist/add
// @desc    Add a stock to the user's watchlist
// @access  Private
router.post(
  '/add',
  [
    auth,
    [
      check('symbol', 'Stock symbol is required').not().isEmpty(),
      check('name', 'Stock name is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { symbol, name } = req.body;

    try {
      const user = await User.findById(req.user.id);

      // Check if the stock is already in the watchlist
      const existingWatchlistItem = await Watchlist.findOne({
        user: req.user.id,
        symbol,
      });

      if (existingWatchlistItem) {
        return res.status(400).json({ msg: 'Stock is already in the watchlist' });
      }

      // Create a new watchlist item
      const newWatchlistItem = new Watchlist({
        user: req.user.id,
        symbol,
        name,
      });

      await newWatchlistItem.save();

      res.json(newWatchlistItem);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE /api/watchlist/remove/:symbol
// @desc    Remove a stock from the user's watchlist
// @access  Private
router.delete('/remove/:symbol', auth, async (req, res) => {
  try {
    const watchlistItem = await Watchlist.findOne({
      user: req.user.id,
      symbol: req.params.symbol,
    });

    if (!watchlistItem) {
      return res.status(404).json({ msg: 'Stock not found in watchlist' });
    }

    await watchlistItem.remove();

    res.json({ msg: 'Stock removed from watchlist' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/watchlist
// @desc    Get the user's watchlist
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const watchlist = await Watchlist.find({ user: req.user.id }).sort({ date: -1 });
    res.json(watchlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
