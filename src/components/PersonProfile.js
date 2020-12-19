import React from 'react';
import { Header, Loader, Icon } from 'semantic-ui-react';
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import _ from "lodash";
import GraphGistList from './GraphGistList';
import GraphGistCard from './GraphGistCard';

const graphql = gql`
  query PersonQuery($uuid: ID!) {
    Person(uuid: $uuid) {
      uuid
      name
      twitter_username
    }
  }
`

const list_graphql = gql`
  query GraphGists($uuid: ID!) {
    items: graphGistsByAuthorPerson(uuid: $uuid) {
      ...GraphGistCard
    }
  }
  ${GraphGistCard.fragments.graphGist}
`

function PersonProfile(props) {
  const {uuid} = props.match.params;

  const { loading, data } = useQuery(graphql, {
    fetchPolicy: "cache-and-network",
    variables: { uuid }
  });

  const person = _.get(data, 'Person[0]', null);

  return (
    loading ? 
      <Loader active inline='centered' />
    :
      <div>
        <Header as="h2">
          <Header.Content>
            {person && person.name}
            {(person && person.twitter_username) && <Header.Subheader>
              <a href={`https://twitter.com/${person.twitter_username}`}><Icon name="twitter" /> {person.twitter_username}</a>
            </Header.Subheader>}
          </Header.Content>
        </Header>

        <GraphGistList
          graphql={list_graphql}
          variables={{uuid}}
        />
      </div>
  );
}

export default PersonProfile;
