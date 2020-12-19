import React from 'react';
import { Header } from 'semantic-ui-react';
import gql from "graphql-tag";
import GraphGistList from './GraphGistList';
import GraphGistCard from './GraphGistCard';

const graphql = gql`
  query gistsSearch($searchString: String!) {
    items: graphGistSearch(searchString: $searchString) {
      ...GraphGistCard
    }
  }
  ${GraphGistCard.fragments.graphGist}
`

function Search(props) {
  const {query} = props.match.params;

  return (
    <div>
      <Header as='h2'>Search for {query}</Header>
      <GraphGistList
        graphql={graphql}
        variables={{searchString: query}}
      />
    </div>
  );
}

export default Search;
