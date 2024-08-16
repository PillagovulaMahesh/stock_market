// backend/routes/trade.js

const express = require('express');
const router = express.Router();
const Trade = require('../models/Trade');
const Stock = require('../models/Stock');
const User = require('../models/User');

// @route   POST /api/trades
// @desc    Create a new trade (buy or sell)
// @access  Private
router.post('/', async (req, res) => {
  const { user, stock, tradeType, quantity, price } = req.body;

  try {
    // Check if stock exists
    const stockExists = await Stock.findById(stock);
    if (!stockExists) {
      return res.status(404).json({ msg: 'Stock not found' });
    }

    // Create a new trade
    const trade = new Trade({
      user,
      stock,
      tradeType,
      quantity,
      price,
    });

    await trade.save();
    res.json(trade);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/trades/:userId
// @desc    Get all trades for a user
// @access  Private
router.get('/:userId', async (req, res) => {
  try {
    const trades = await Trade.find({ user: req.params.userId }).populate('stock', ['symbol', 'name']);
    res.json(trades);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
