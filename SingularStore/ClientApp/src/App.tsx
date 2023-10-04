import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, RouteProps, useHistory } from 'react-router-dom';
import Container from '@mui/material/Container';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUp'


const App = () => {
  const token = localStorage.getItem('token');
  const history = useHistory();

  // Check if the user is already logged in (you can modify this logic)

  useEffect(() => {
    if (token) {
      history.push('/');
    } else {
      history.push('/login');
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div style={{ height: "100%" }}>
        <Switch>
          <Route exact path="/">
            <>
              <HomePage />
  
            </>
          </Route>
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />

        </Switch>
      </div>
    </Router>
  );
};

export default App;
