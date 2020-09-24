import React, { useState, useEffect } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { toast } from 'react-toastify';

//components

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/dashboard/Dashboard';
import Landing from './components/Landing';
import axios from 'axios';

toast.configure();

// declare a request interceptor
axios.interceptors.request.use(
  (config) => {
    // perform a task before the request is sent
    const method = config.method.toUpperCase();
    if (method === 'POST' || method === 'PATCH' || method === 'PUT')
      config.headers['Content-Type'] = 'application/json;charset=utf-8';

    const token = localStorage.getItem('token');
    if (token) config.headers.jwt_token = token;

    return config;
  },
  (error) => {
    // handle the error
    return Promise.reject(error);
  }
);

function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/authentication/verify'
      );

      res.data === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <>
      <Router>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) =>
                !isAuthenticated ? (
                  <Landing {...props} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/login"
              render={(props) =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={(props) =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={(props) =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
