import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card } from 'semantic-ui-react';
import axios from 'axios';
import GraphGistCard from './GraphGistCard';

class Home extends Component {
  state = {
    useCases: [],
    industries: [],
    graphGists: []
  }

  componentDidMount() {
    axios.get('https://portal.graphgist.org/featured_graphgists.json')
      .then((response) => {
        this.setState({graphGists: response.data});
      })
      .catch((error) => {
        this.setState({error: true});
      });

    axios.get('https://portal.graphgist.org/use_cases.json')
      .then((response) => {
        this.setState({useCases: response.data});
      })
      .catch((error) => {
        this.setState({error: true});
      });

    axios.get('https://portal.graphgist.org/industries.json')
      .then((response) => {
        this.setState({industries: response.data});
      })
      .catch((error) => {
        this.setState({error: true});
      });
  }

  render() {
    return (
      <div>
        <h1>Explore By Use Case</h1>
        <Grid columns={3}>
          {this.state.useCases.map((useCase) => {
            return <Grid.Column key={useCase.id}><Link to={`/category/${useCase.slug}`}>
              <img src={useCase.image} width="40" alt={useCase.title} /> {useCase.title}
            </Link></Grid.Column>;
          })}
        </Grid>

        <h1>Industries</h1>
        <Grid columns={3}>
          {this.state.industries.map((industry) => {
            return <Grid.Column key={industry.id}><Link to={`/category/${industry.slug}`}>
              <img src={industry.image} width="40" alt={industry.title} /> {industry.title}
            </Link></Grid.Column>;
          })}
        </Grid>

        <h1>Featured GraphGists</h1>
        <Card.Group>
          {this.state.graphGists.map((graphgist) => {
            return <GraphGistCard key={graphgist.id} graphgist={graphgist} />;
          })}
        </Card.Group>
      </div>
    );
  }
}

export default Home;
