import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';

class GraphGistCard extends Component {
  render() {
    const {graphgist} = this.props;
    return <Card as={Link} to={`/graphgist/${graphgist.slug}`}>
      <Card.Content>
        <Card.Header>{graphgist.title}</Card.Header>
      </Card.Content>
      {graphgist.image && <Image src={graphgist.image} />}
      <Card.Content>
        <Icon name='user' /> {graphgist.author && graphgist.author.name}
      </Card.Content>
    </Card>;
  }
}

GraphGistCard.propTypes = {
  graphgist: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })
};

export default GraphGistCard;
