// backend/routes/stocks.js

const express = require('express');
const axios = require('axios');
const config = require('config');
const auth = require('../middleware/auth');

const router = express.Router();

// Helper function to get stock data from an external API
const fetchStockData = async (symbol) => {
  try {
    const apiKey = config.get('alphaVantageApiKey');
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching stock data');
  }
};

// @route   GET /api/stocks/:symbol
// @desc    Get real-time stock data by symbol
// @access  Public
router.get('/:symbol', async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();

  try {
    const data = await fetchStockData(symbol);
    if (!data || !data['Time Series (5min)']) {
      return res.status(404).json({ msg: 'Stock data not found' });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   GET /api/stocks/search/:query
// @desc    Search for stocks by query
// @access  Public
router.get('/search/:query', async (req, res) => {
  const query = req.params.query;

  try {
    const apiKey = config.get('alphaVantageApiKey');
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${apiKey}`;
    const response = await axios.get(url);

    if (!response.data || !response.data.bestMatches) {
      return res.status(404).json({ msg: 'No stocks found' });
    }

    res.json(response.data.bestMatches);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   GET /api/stocks/historical/:symbol
// @desc    Get historical stock data by symbol
// @access  Public
router.get('/historical/:symbol', async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();

  try {
    const apiKey = config.get('alphaVantageApiKey');
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey=${apiKey}`;
    const response = await axios.get(url);

    if (!response.data || !response.data['Time Series (Daily)']) {
      return res.status(404).json({ msg: 'Historical data not found' });
    }

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
