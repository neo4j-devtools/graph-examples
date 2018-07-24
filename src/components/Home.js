import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import GraphGistList from './GraphGistList';

class Home extends Component {
  render() {
    return (
      <div>
        <Header as='h2'>Featured GraphGists</Header>
        <GraphGistList url='/featured_graphgists.json' />
      </div>
    );
  }
}

export default Home;
