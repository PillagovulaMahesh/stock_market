import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './services/api'; // Assume this function handles user logout
import './Navbar.css'; // Include styling for the navbar

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // Assume user state is managed in Redux

  const handleLogout = async () => {
    try {
      await logout(); // Call logout function
      dispatch({ type: 'LOGOUT' }); // Dispatch logout action
      window.location.href = '/login'; // Redirect to login page
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">StockApp</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/watchlist">Watchlist</Link></li>
        {user ? (
          <>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/trades">Trades</Link></li>
            <li>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
