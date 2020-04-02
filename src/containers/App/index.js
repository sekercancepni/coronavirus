import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import 'scss/_reset.scss';

import HomePage from 'containers/HomePage';

import './style.scss';

const App = () => (
  <div className="wrapper">
    <Router>
      <Switch>
        <Route component={HomePage} />
      </Switch>
    </Router>
  </div>
);

export default App;
