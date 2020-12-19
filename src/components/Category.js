import React from 'react';
import { Header, Loader } from 'semantic-ui-react';
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import _ from "lodash";
import GraphGistList from './GraphGistList';
import GraphGistCard from './GraphGistCard';

const graphql = gql`
  query Category($slug: String!) {
    category: getCategory(slug: $slug) {
      slug
      name
    }
  }
`

const list_graphql = gql`
  query GraphGists($slug: String!) {
    items: graphGistsByCategory(slug: $slug) {
      ...GraphGistCard
    }
  }
  ${GraphGistCard.fragments.graphGist}
`

function Category(props) {
  const {categorySlug} = props.match.params;

  const { loading, data } = useQuery(graphql, {
    fetchPolicy: "cache-and-network",
    variables: {
      slug: categorySlug
    }
  });

  const category = _.get(data, 'category', null);

  return (
    (loading || !data) ? 
      <Loader active inline='centered' />
    :
      <div>
        <Header as="h2">{category && category.name}</Header>
        <GraphGistList
          graphql={list_graphql}
          variables={{slug: categorySlug}}
        />
      </div>
  );
}

export default Category;
