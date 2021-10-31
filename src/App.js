import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import { Exchanges, Homepage, News, Cryptocurrencies, CryptoDetails, Navbar } from './components';
import './App.css';

import { GlobalProvider } from './Hooks/GlobalState';
import Login from './components/Login'
import Signup from './components/Signup'
import {AuthProvider} from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute';

const App = () => (
  <GlobalProvider>
    <div className="app">
    <div className="navbar">
      <Navbar />
    </div>
    <div className="main">
      <Layout>
        <div className="routes">
        <AuthProvider>
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <PrivateRoute exact path="/exchanges">
              <Exchanges />
            </PrivateRoute>
            <Route exact path="/cryptocurrencies">
              <Cryptocurrencies />
            </Route>
            <Route exact path="/crypto/:coinId">
              <CryptoDetails />
            </Route>
            <Route exact path="/news">
              <News />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
          </Switch>
        </AuthProvider>
        </div>
      </Layout>
      <div className="footer">
        <Typography.Title level={5} style={{ color: 'white', textAlign: 'center'}}>Copyright © 2021{' '}
          <Link to="/">
             DotCoin. Inc.
          </Link> <br/>
          All Rights Reserved.
        </Typography.Title>
        <Space>
          <Link to="/">Home</Link>
          <Link to="/exchanges">PlayGround</Link>
          <Link to="/news">News</Link>
        </Space>
      </div>
    </div>
  </div>
  </GlobalProvider>
);

export default App;