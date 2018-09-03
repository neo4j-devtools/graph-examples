import React, { Component } from 'react';
import { MemoryRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import { DesktopIntegration } from "graph-app-kit/components/DesktopIntegration";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import AppMenu from './components/Menu';
import Home from './components/Home';
import Search from './components/Search';
import Category from './components/Category';
import MyGraphGists from './components/MyGraphGists';
import { setNeo4jBrowserUrl, setNeo4jCurrentDB } from './components/actions'; 
import 'semantic-ui-css/semantic.min.css';
import './App.css';

class App extends Component {
  setNeo4jURL = (context) => {
    context.projects.forEach((project) => {
      const activeGraph = _.find(project.graphs, { 'status': 'ACTIVE' });
      if (activeGraph) {
        const { http } = activeGraph.connection.configuration.protocols;
        if (http && http.enabled) {
          this.props.setNeo4jBrowserUrl(`http://${http.host}:${http.port}/browser`);
        }
        this.props.setNeo4jCurrentDB(activeGraph.name);
      }
    });
  }

  render() {
    return (
      <MemoryRouter>
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
      </MemoryRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setNeo4jBrowserUrl, setNeo4jCurrentDB }, dispatch);
}

export default connect(null, mapDispatchToProps)(App);
