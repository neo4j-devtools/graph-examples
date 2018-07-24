import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Category from './components/Category';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

class App extends Component {
  state = {
    useCases: [],
    industries: [],
    graphGists: []
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <header>
            <h1><Link to="/">Graph Gallery</Link></h1>
          </header>

          <Route path="/category/:categorySlug" component={Category} />
          <Route exact path="/" component={Home} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
