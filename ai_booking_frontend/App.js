import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Booking from './components/Booking';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';

import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Booking} />
        <Route path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
