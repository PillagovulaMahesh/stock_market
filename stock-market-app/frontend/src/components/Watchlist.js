import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWatchlist, removeFromWatchlist, addToWatchlist } from './services/api'; // Assume these functions handle watchlist operations
import './Watchlist.css'; // Include styling for the watchlist

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user); // Assume user state is managed in Redux
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const data = await getWatchlist(user.id); // Fetch watchlist data based on user ID
        setWatchlist(data);
      } catch (err) {
        setError('Failed to fetch watchlist data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchWatchlist();
    }
  }, [user]);

  const handleRemove = async (symbol) => {
    try {
      await removeFromWatchlist(user.id, symbol); // Remove stock from watchlist
      setWatchlist(watchlist.filter((item) => item.symbol !== symbol));
    } catch (err) {
      setError('Failed to remove stock from watchlist');
      console.error(err);
    }
  };

  const handleAdd = async (symbol) => {
    try {
      await addToWatchlist(user.id, symbol); // Add stock to watchlist
      const updatedWatchlist = await getWatchlist(user.id);
      setWatchlist(updatedWatchlist);
    } catch (err) {
      setError('Failed to add stock to watchlist');
      console.error(err);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="watchlist-container">
      <h1>Your Watchlist</h1>
      <table className="watchlist-table">
        <thead>
          <tr>
            <th>Stock Symbol</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {watchlist.map((item) => (
            <tr key={item.symbol}>
              <td>{item.symbol}</td>
              <td>
                <button onClick={() => handleRemove(item.symbol)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-stock">
        <input
          type="text"
          placeholder="Enter stock symbol"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAdd(e.target.value.toUpperCase());
              e.target.value = '';
            }
          }}
        />
      </div>
    </div>
  );
};

export default Watchlist;
