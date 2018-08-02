import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, List, Button } from 'semantic-ui-react';
import moment from 'moment';
import { BASE_API_URL } from '../axios';

class GraphGistCard extends Component {
  render() {
    const {graphgist, showEdit} = this.props;
    return <Card>
      <Card.Content>
        <Card.Header>{graphgist.title}</Card.Header>
      </Card.Content>
      {graphgist.image && <Image src={graphgist.image} />}
      <Card.Content>
        <List>
          {graphgist.author && <List.Item>
            <List.Icon name='user' />
            <List.Content>{graphgist.author.name}</List.Content>
          </List.Item>}
          {graphgist.featured && <List.Item>
            <List.Icon name='star' />
            <List.Content>Featured</List.Content>
          </List.Item>}
          <List.Item>
            <List.Icon name='calendar' />
            <List.Content>Last update at {moment(graphgist.updated_at).format('lll')}</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='file code outline' />
            <List.Content><a href={`${BASE_API_URL}/graph_gists/${graphgist.slug}/source`} target='_blank'>Source</a></List.Content>
          </List.Item>
          <List.Item>
            <List.Content><Button primary to={`${BASE_API_URL}/graph_gists/${graphgist.slug}/graph_guide`}>Play as Browser Guide</Button></List.Content>
          </List.Item>
          {showEdit && <List.Item>
            <List.Content><a className="ui teal button" href={`${BASE_API_URL}/graph_gists/${graphgist.graphgist  ? graphgist.graphgist.id : graphgist.id}/edit_by_owner`} target='_blank'>Edit</a></List.Content>
          </List.Item>}
        </List>
      </Card.Content>
    </Card>;
  }
}

GraphGistCard.propTypes = {
  graphgist: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }),
  showEdit: PropTypes.bool.isRequired
};

GraphGistCard.defaultProps = {
  showEdit: false
};

export default GraphGistCard;
