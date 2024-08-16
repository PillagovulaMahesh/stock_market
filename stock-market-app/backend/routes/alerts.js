// backend/routes/alerts.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Alert = require('../models/Alert');

// @route   GET /api/alerts
// @desc    Get all alerts for the current user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const alerts = await Alert.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(alerts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/alerts
// @desc    Create a new alert
// @access  Private
router.post('/', auth, async (req, res) => {
  const { symbol, targetPrice } = req.body;

  try {
    const newAlert = new Alert({
      user: req.user.id,
      symbol,
      targetPrice,
    });

    const alert = await newAlert.save();
    res.json(alert);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/alerts/:id
// @desc    Delete an alert
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);

    if (!alert) {
      return res.status(404).json({ msg: 'Alert not found' });
    }

    // Check if user owns the alert
    if (alert.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await alert.remove();
    res.json({ msg: 'Alert removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
