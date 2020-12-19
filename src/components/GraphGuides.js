import React from 'react';
import { Header } from 'semantic-ui-react';
import gql from "graphql-tag";
import GraphGistList from './GraphGistList';
import GraphGistCard from './GraphGistCard';

const graphql = gql`
  query GraphGists {
    items: GraphGist(is_guide: true, status: live) {
      ...GraphGistCard
    }
  }
  ${GraphGistCard.fragments.graphGist}
`

function GraphGuides() {
  return <div>
    <Header as="h2">Graph Guides</Header>

    <GraphGistList
      graphql={graphql}
    />
  </div>;
}

export default GraphGuides;
