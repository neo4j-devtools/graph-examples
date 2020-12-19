import React, { Component } from 'react';
import { MemoryRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import { DesktopIntegration } from "graph-app-kit/components/DesktopIntegration";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ApolloClient,  ApolloProvider, InMemoryCache } from "@apollo/client";
import AppMenu from './components/Menu';
import Home from './components/Home';
import Search from './components/Search';
import Category from './components/Category';
import MyGraphGists from './components/MyGraphGists';
import GraphGuides from './components/GraphGuides';
import PersonProfile from './components/PersonProfile';
import { setNeo4jBrowserUrl, setNeo4jCurrentDB } from './components/actions'; 
import 'semantic-ui-css/semantic.min.css';
import './App.css';


const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  cache: new InMemoryCache(),
});


class App extends Component {
  handleNeo4jContext = (context) => {
    let currentActiveGraph;
    context.projects.forEach((project) => {
      const activeGraph = _.find(project.graphs, { 'status': 'ACTIVE' });
      if (activeGraph) {
        const { http } = activeGraph.connection.configuration.protocols;
        if (http && http.enabled) {
          this.props.setNeo4jBrowserUrl(`http://${http.host}:${http.port}/browser`);
        }
        this.props.setNeo4jCurrentDB(activeGraph.name);
        currentActiveGraph = activeGraph;
      }
    });

    if (!currentActiveGraph) {
      this.props.setNeo4jCurrentDB(null);
    }
  }

  render() {
    return (
      <MemoryRouter>
        <ApolloProvider client={client}>
          <div id="app">
            <AppMenu />

            <Segment>
              <Route path="/category/:categorySlug" component={Category} />
              <Route path="/search/:query" component={Search} />
              <Route path="/people/:uuid" component={PersonProfile} />
              <Route path="/my-graphgists" component={MyGraphGists} />
              <Route path="/graph-guides" component={GraphGuides} />
              <Route exact path="/" component={Home} />
            </Segment>

            <DesktopIntegration
              integrationPoint={window.neo4jDesktopApi}
              onMount={this.handleNeo4jContext}
              on={(event, newContext) => {this.handleNeo4jContext(newContext)}}
            />
          </div>
        </ApolloProvider>
      </MemoryRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setNeo4jBrowserUrl, setNeo4jCurrentDB }, dispatch);
}

export default connect(null, mapDispatchToProps)(App);
