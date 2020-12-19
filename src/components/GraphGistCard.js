import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image, List, Label } from 'semantic-ui-react';
import classNames from 'classnames';
import gql from "graphql-tag";
import { BASE_URL } from '../axios';

export function getImage(field) {
  return field.length > 0
    ? field[0].source_url
    : null
}

function GraphGistCard({graphGist, showEdit}) {
  const playUrl = encodeURI(`https://guides.neo4j.com/graph-examples/${graphGist.slug}/graph_guide`);
  const image = getImage(graphGist.image);
  return <Card className="graphGistCard">
    <Card.Content className="graphGistCard__header">
      <Card.Header>{graphGist.title}</Card.Header>
    </Card.Content>
    {graphGist.image && <Card.Content className="graphGistCard__image">
        <Image src={image} />
    </Card.Content>}
    <Card.Content>
      <List>
        {graphGist.author && <List.Item>
          <List.Icon name='user' />
          <List.Content><Link to={`/people/${graphGist.author.uuid}`}>{graphGist.author.name}</Link></List.Content>
        </List.Item>}
        {graphGist.featured && <List.Item>
          <List.Icon name='checkmark' />
          <List.Content><Link to="/">Featured</Link></List.Content>
        </List.Item>}
        {graphGist.neo4j_version && <List.Item>
          <List.Icon name='info circle' />
          <List.Content>Neo4j Version: {graphGist.neo4j_version}</List.Content>
        </List.Item>}
        <List.Item>
          <List.Icon name='file code outline' />
          <List.Content><a href={`${BASE_URL}/graph_gists/${graphGist.slug}`} target='_blank'>Source</a></List.Content>
        </List.Item>
        {(graphGist.use_cases.length > 0 || graphGist.industries.length > 0) && <List.Item className="graphGistCard__labels">
          <List.Content>
            {graphGist.use_cases.map((category, index) => {
              const category_image = getImage(category.image);
              return <Label as={Link} key={index} to={`/category/${category.slug}`} image>
                <img src={category_image} alt={category.name} />
                {category.name}</Label>;
            })}
           {graphGist.industries.map((category, index) => {
              const category_image = getImage(category.image);
              return <Label as={Link} key={index} to={`/category/${category.slug}`} image>
                <img src={category_image} alt={category.name} />
                {category.name}</Label>;
            })}
          </List.Content>
        </List.Item>}
      </List>
    </Card.Content>
    <Card.Content className="graphGistCard__footer">
      <List>
        {showEdit && <List.Item>
          <List.Content><a className="ui teal button" href={`${BASE_URL}/graph_gists/${graphGist.graphGist  ? graphGist.graphGist.id : graphGist.id}/edit_by_owner`} target='_blank'>Edit</a></List.Content>
        </List.Item>}
        <List.Item>
          <List.Content>
            <a
              className={classNames('ui primary button')}
              href={`neo4j://graphapps/neo4j-browser?cmd=play&arg=${playUrl}`}
            >Play as Browser Guide</a>
          </List.Content>
        </List.Item>
      </List>
    </Card.Content>
  </Card>
}

GraphGistCard.propTypes = {
  showEdit: PropTypes.bool.isRequired
};

GraphGistCard.defaultProps = {
  showEdit: false
};

GraphGistCard.fragments = {
  graphGist: gql`
    fragment GraphGistCard on GraphGist {
      uuid
      slug
      title
      author {
        uuid
        name
      }
      featured
      image(first: 1) {
        source_url
      }
      neo4j_version
      use_cases {
        name
        slug
        image(first: 1) {
          source_url
        }
      }
      industries {
        name
        slug
        image(first: 1) {
          source_url
        }
      }
    }
  `
}

export default GraphGistCard;
