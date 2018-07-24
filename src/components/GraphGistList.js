import React, { Component } from 'react';
import { Card, Loader } from 'semantic-ui-react';
import axios, { CancelToken, isCancel } from '../axios';
import GraphGistCard from './GraphGistCard';

const initialState = {
  isLoadingList: true,
  graphGists: [],
  cancelRequest: null
};

class GraphGistList extends Component {
  state = initialState; 

  componentDidMount() {
    this.getGraphGistList();
  }

  componentWillUnmount() {
    const {cancelRequest} = this.state;
    if(typeof cancelRequest === 'function') {
      cancelRequest();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url || prevProps.params !== this.props.params) {
      this.getGraphGistList();
    }
  }

  getGraphGistList() {
    const {url, params} = this.props;

    this.setState(initialState, () => {
      axios.get(url, {
        params,
        cancelToken: new CancelToken((cancelRequest) => {
          this.setState({cancelRequest});
        })
      })
        .then((response) => {
          this.setState({graphGists: response.data, isLoadingList: false});
        })
        .catch((error) => {
          if (!isCancel(error)) {
            this.setState({error: true});
          }
        });
    });
  }

  render() {
    const {graphGists, isLoadingList} = this.state;
    return (
      isLoadingList ?
        <Loader active inline='centered' />
      :
        <Card.Group>
          {graphGists.map((graphgist) => {
            return <GraphGistCard key={graphgist.id} graphgist={graphgist} />;
          })}
        </Card.Group>
    );
  }
}

export default GraphGistList;
