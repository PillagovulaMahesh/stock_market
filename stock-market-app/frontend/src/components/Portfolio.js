import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPortfolio } from './services/api'; // Assume this function fetches portfolio data
import './Portfolio.css'; // Include styling for the portfolio

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user); // Assume user state is managed in Redux

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await getPortfolio(user.id); // Fetch portfolio data based on user ID
        setPortfolio(data);
      } catch (err) {
        setError('Failed to fetch portfolio data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPortfolio();
    }
  }, [user]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  const calculateTotalValue = () => {
    return portfolio.reduce((total, item) => total + (item.currentPrice * item.quantity), 0).toFixed(2);
  };

  return (
    <div className="portfolio-container">
      <h1>Your Portfolio</h1>
      <div className="portfolio-summary">
        <h2>Total Portfolio Value: ${calculateTotalValue()}</h2>
      </div>
      <table className="portfolio-table">
        <thead>
          <tr>
            <th>Stock Symbol</th>
            <th>Quantity</th>
            <th>Current Price</th>
            <th>Total Value</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((item) => (
            <tr key={item.symbol}>
              <td>{item.symbol}</td>
              <td>{item.quantity}</td>
              <td>${item.currentPrice.toFixed(2)}</td>
              <td>${(item.currentPrice * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;
