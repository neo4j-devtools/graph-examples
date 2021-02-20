import React from 'react';
import PropTypes from 'prop-types';
import { Card, Loader, Message } from 'semantic-ui-react';
import { useQuery } from "@apollo/client";
import GraphGistCard from './GraphGistCard';


function GraphGistList({graphql, variables}) {
  const { loading, data, error } = useQuery(graphql, {
    fetchPolicy: "cache-and-network",
    variables
  });

  return (<React.Fragment>
    {loading && !error && <Loader active inline='centered' />}
    {error && !loading && <p>Error</p>}
    {data && !loading && !error && (
      data.items.length > 0 ? <Card.Group itemsPerRow={3}>
        {data.items.map((graphGist) => (
          <GraphGistCard key={graphGist.uuid} graphGist={graphGist} />
        ))}
      </Card.Group>
      : <Message>
        <Message.Header>Nothing found</Message.Header>
      </Message>
    )}
  </React.Fragment>);
}

GraphGistList.propTypes = {
  showEdit: PropTypes.bool.isRequired
};

GraphGistList.defaultProps = {
  showEdit: false
};

export default GraphGistList;
