import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import GraphGistList from './GraphGistList';

class GraphGuides extends Component {
  render() {
    return <div>
      <Header as="h2">Graph Guides</Header>

      <GraphGistList
        url="/graph_guides.json"
        showEdit={true}
      />
    </div>;
  }
}

export default GraphGuides;
