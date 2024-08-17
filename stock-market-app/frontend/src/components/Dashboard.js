import React, { useState, useEffect } from 'react';
import Chart from './components/Chart';
import Watchlist from './components/Watchlist';
import Portfolio from './components/Portfolio';
import { getWatchlist, getPortfolio } from './services/api';

const Dashboard = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [selectedStock, setSelectedStock] = useState('AAPL');

  useEffect(() => {
    // Fetch the user's watchlist and portfolio data
    const fetchData = async () => {
      try {
        const watchlistData = await getWatchlist();
        const portfolioData = await getPortfolio();
        setWatchlist(watchlistData);
        setPortfolio(portfolioData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleStockSelect = (symbol) => {
    setSelectedStock(symbol);
  };

  return (
    <div className="dashboard">
      <h1>Stock Market Dashboard</h1>
      <div className="dashboard-content">
        <div className="chart-section">
          <Chart symbol={selectedStock} interval="D" theme="light" />
        </div>
        <div className="sidebar">
          <Watchlist watchlist={watchlist} onStockSelect={handleStockSelect} />
          <Portfolio portfolio={portfolio} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
