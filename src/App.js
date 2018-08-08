import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import { DesktopIntegration } from "graph-app-kit/components/DesktopIntegration";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppMenu from './components/Menu';
import Home from './components/Home';
import Search from './components/Search';
import Category from './components/Category';
import MyGraphGists from './components/MyGraphGists';
import { setNeo4jBrowserUrl } from './components/actions'; 
import 'semantic-ui-css/semantic.min.css';
import './App.css';

class App extends Component {
  setNeo4jURL = (context) => {
    const { http } = context.projects[0].graphs[0].connection.configuration.protocols;
    if (http && http.enabled) {
      this.props.setNeo4jBrowserUrl(`http://${http.host}:${http.port}/browser`);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div id="app">
          <AppMenu />

          <Segment>
            <Route path="/category/:categorySlug" component={Category} />
            <Route path="/search/:query" component={Search} />
            <Route path="/my-graphgists" component={MyGraphGists} />
            <Route exact path="/" component={Home} />
          </Segment>

          <DesktopIntegration
            integrationPoint={window.neo4jDesktopApi}
            onMount={this.setNeo4jURL}
          />
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setNeo4jBrowserUrl }, dispatch);
}

export default connect(null, mapDispatchToProps)(App);
