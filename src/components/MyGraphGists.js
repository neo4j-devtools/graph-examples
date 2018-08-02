import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import GraphGistList from './GraphGistList';

class MyGraphGists extends Component {
  render() {
    return <div>
      <Header as="h2">My GraphGists</Header>

      <GraphGistList
        url="/my_graphgists.json"
        showEdit={true}
      />
    </div>;
  }
}

export default MyGraphGists;
