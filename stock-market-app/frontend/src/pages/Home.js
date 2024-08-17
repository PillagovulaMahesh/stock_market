import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStockData, fetchPortfolioSummary } from './services/api'; // Assume these functions handle API calls
import Chart from './Chart'; // Assume this component is used to display stock charts
import Watchlist from './Watchlist'; // Link to Watchlist component
import './Home.css'; // Include styling for the home page

const Home = () => {
  const [stockData, setStockData] = useState([]);
  const [portfolioSummary, setPortfolioSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user); // Assume user state is managed in Redux
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stocks = await fetchStockData(); // Fetch stock data from API
        const portfolio = await fetchPortfolioSummary(user.id); // Fetch portfolio summary
        setStockData(stocks);
        setPortfolioSummary(portfolio);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home-container">
      <h1>Welcome to Your Stock Market Dashboard</h1>
      <div className="dashboard">
        <div className="chart-section">
          <h2>Stock Market Overview</h2>
          <Chart data={stockData} /> {/* Render chart with fetched stock data */}
        </div>
        <div className="portfolio-summary">
          <h2>Your Portfolio</h2>
          <p>Total Value: ${portfolioSummary.totalValue}</p>
          <p>Unrealized Gains/Losses: ${portfolioSummary.unrealizedGains}</p>
        </div>
      </div>
      <div className="quick-links">
        <Watchlist /> {/* Render Watchlist component */}
        {/* Add other quick links or components here */}
      </div>
    </div>
  );
};

export default Home;
