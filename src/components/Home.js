import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import gql from "graphql-tag";
import GraphGistList from './GraphGistList';
import GraphGistCard from './GraphGistCard';

const graphql = gql`
  query FeaturedGraphGists {
    items: GraphGist(status: live, featured: true) {
      ...GraphGistCard
    }
  }
  ${GraphGistCard.fragments.graphGist}
`


class Home extends Component {
  render() {
    return (
      <div>
        <Header as='h2'>Featured Graph Examples</Header>
        <GraphGistList graphql={graphql} />
      </div>
    );
  }
}

export default Home;
