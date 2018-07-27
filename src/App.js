import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import AppMenu from './components/Menu';
import Home from './components/Home';
import Search from './components/Search';
import Category from './components/Category';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div id="app">
          <AppMenu />

          <Segment>
            <Route path="/category/:categorySlug" component={Category} />
            <Route path="/search/:query" component={Search} />
            <Route exact path="/" component={Home} />
          </Segment>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
