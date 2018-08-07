import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppraisalListings from './components/AppraisalListings'
import Header from './components/Header';
import './App.css';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/appraisals" component={AppraisalListings} />
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
