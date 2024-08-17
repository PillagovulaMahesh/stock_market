// backend/services/stockServices.js

const axios = require('axios');
const { API_KEY, API_URL } = require('../config'); // Ensure these are defined in your config

// Function to fetch real-time stock data
const fetchRealTimeStockData = async (symbol) => {
  try {
    const response = await axios.get(`${API_URL}/query`, {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol: symbol,
        interval: '1min',
        apikey: API_KEY,
      },
    });

    if (response.data['Error Message']) {
      throw new Error('Invalid API call. Please retry or contact support.');
    }

    return response.data;
  } catch (error) {
    console.error(`Error fetching real-time data for ${symbol}:`, error.message);
    throw error;
  }
};

// Function to fetch historical stock data
const fetchHistoricalStockData = async (symbol, timeSeries = 'TIME_SERIES_DAILY') => {
  try {
    const response = await axios.get(`${API_URL}/query`, {
      params: {
        function: timeSeries,
        symbol: symbol,
        apikey: API_KEY,
      },
    });

    if (response.data['Error Message']) {
      throw new Error('Invalid API call. Please retry or contact support.');
    }

    return response.data;
  } catch (error) {
    console.error(`Error fetching historical data for ${symbol}:`, error.message);
    throw error;
  }
};

// Function to fetch data for multiple stocks (e.g., for a watchlist)
const fetchMultipleStocksData = async (symbols) => {
  try {
    const promises = symbols.map(symbol => fetchRealTimeStockData(symbol));
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error('Error fetching data for multiple stocks:', error.message);
    throw error;
  }
};

// Function to fetch stock metadata (e.g., company info)
const fetchStockMetadata = async (symbol) => {
  try {
    const response = await axios.get(`${API_URL}/query`, {
      params: {
        function: 'SYMBOL_SEARCH',
        keywords: symbol,
        apikey: API_KEY,
      },
    });

    if (response.data['Error Message']) {
      throw new Error('Invalid API call. Please retry or contact support.');
    }

    return response.data;
  } catch (error) {
    console.error(`Error fetching metadata for ${symbol}:`, error.message);
    throw error;
  }
};

module.exports = {
  fetchRealTimeStockData,
  fetchHistoricalStockData,
  fetchMultipleStocksData,
  fetchStockMetadata,
};
