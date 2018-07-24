import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { Grid, Card } from 'semantic-ui-react';
import axios from 'axios';
import GraphGistCard from './GraphGistCard';

class Category extends Component {
  state = {
    category: null,
    graphGists: []
  }

  componentDidMount() {
    const {categorySlug} = this.props.match.params;

    axios.get(`https://portal.graphgist.org/categories/${categorySlug}.json`)
      .then((response) => {
        this.setState({category: response.data});
      })
      .catch((error) => {
        this.setState({error: true});
      });

    axios.get('https://portal.graphgist.org/graph_gists.json', {
        params: {
          category: categorySlug
        }
      })
      .then((response) => {
        this.setState({graphGists: response.data});
      })
      .catch((error) => {
        this.setState({error: true});
      });
  }

  render() {
    const {category, graphGists} = this.state;
    return (
      <BrowserRouter>
        <div>
          <header>
            <h1>{category && category.title}</h1>
          </header>

          <Card.Group>
            {this.state.graphGists.map((graphgist) => {
              return <GraphGistCard key={graphgist.id} graphgist={graphgist} />;
            })}
          </Card.Group>
        </div>
      </BrowserRouter>
    );
  }
}

export default Category;
