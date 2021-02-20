import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image, List, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { BASE_API_URL } from '../axios';

class GraphGistCard extends Component {
  render() {
    const {graphgist, showEdit} = this.props;
    const playUrl = encodeURI(`https://guides.neo4j.com/graph-examples/${graphgist.slug}/graph_guide`);
    return <Card className="graphGistCard">
      <Card.Content className="graphGistCard__header">
        <Card.Header>{graphgist.title}</Card.Header>
      </Card.Content>
      {graphgist.image && <Card.Content className="graphGistCard__image">
          <Image src={graphgist.image} />
      </Card.Content>}
      <Card.Content>
        <List>
          {graphgist.author && <List.Item>
            <List.Icon name='user' />
            <List.Content><Link to={`/people/${graphgist.author.id}`}>{graphgist.author.name}</Link></List.Content>
          </List.Item>}
          {graphgist.featured && <List.Item>
            <List.Icon name='checkmark' />
            <List.Content><Link to="/">Featured</Link></List.Content>
          </List.Item>}
          {graphgist.neo4j_version && <List.Item>
            <List.Icon name='info circle' />
            <List.Content>Neo4j Version: {graphgist.neo4j_version}</List.Content>
          </List.Item>}
          <List.Item>
            <List.Icon name='file code outline' />
            <List.Content><a href={`${BASE_API_URL}/graph_gists/${graphgist.slug}`} target='_blank'>Source</a></List.Content>
          </List.Item>
          {(graphgist.use_cases.length > 0 || graphgist.industries.length > 0) && <List.Item className="graphGistCard__labels">
            <List.Content>
              {graphgist.use_cases.map((category, index) => {
                return <Label as={Link} key={index} to={`/category/${category.slug}`} image>
                  <img src={category.image} />
                  {category.name}</Label>;
              })}
             {graphgist.industries.map((category, index) => {
                return <Label as={Link} key={index} to={`/category/${category.slug}`} image>
                  <img src={category.image} />
                  {category.name}</Label>;
              })}
            </List.Content>
          </List.Item>}
        </List>
      </Card.Content>
      <Card.Content className="graphGistCard__footer">
        <List>
          {showEdit && <List.Item>
            <List.Content><a className="ui teal button" href={`${BASE_API_URL}/graph_gists/${graphgist.graphgist  ? graphgist.graphgist.id : graphgist.id}/edit_by_owner`} target='_blank'>Edit</a></List.Content>
          </List.Item>}
          <List.Item>
            <List.Content>
              <a
                className={classNames('ui primary button')}
                href={`neo4j-desktop://graphapps/neo4j-browser?cmd=play&arg=${playUrl}`}
              >Play as Browser Guide</a>
            </List.Content>
          </List.Item>
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

const mapStateToProps = state => {
  return {
    neo4j: state.neo4j
  };
}

export default connect(mapStateToProps, null)(GraphGistCard);
