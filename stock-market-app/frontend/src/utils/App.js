import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/actions'; // Adjust path if needed
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Portfolio from './components/Portfolio';
import Watchlist from './components/Watchlist';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute'; // Custom route for protected pages
import { checkUserAuth } from './utils/authUtils'; // Function to check user authentication status

const App = () => {
  const dispatch = useDispatch();

  // Check user authentication status on app load
  React.useEffect(() => {
    const checkAuth = async () => {
      const user = await checkUserAuth(); // Function to fetch authenticated user info
      if (user) {
        dispatch(setUser(user)); // Update Redux state with user info
      }
    };

    checkAuth();
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/portfolio" component={Portfolio} />
        <PrivateRoute path="/watchlist" component={Watchlist} />
        <PrivateRoute path="/profile" component={Profile} />
        <Route path="*">
          <h1>404 - Page Not Found</h1>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
