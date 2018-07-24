import React, { Component } from 'react';
import { Header, Loader } from 'semantic-ui-react';
import axios, { CancelToken, isCancel } from '../axios';
import GraphGistList from './GraphGistList';

const initialState = {
  isLoadingCategory: true,
  category: null,
  cancelRequest: null
};

class Category extends Component {
  state = initialState; 
  componentDidMount() {
    this.getCategory();
  }

  componentWillUnmount() {
    const {cancelRequest} = this.state;
    if(typeof cancelRequest === 'function') {
      cancelRequest();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.getCategory()
    }
  }

  getCategory(params) {
    const {categorySlug} = this.props.match.params;

    this.setState(initialState, () => {
      axios.get(`/categories/${categorySlug}.json`, {
        cancelToken: new CancelToken((cancelRequest) => {
          this.setState({cancelRequest});
        })
      })
        .then((response) => {
          this.setState({category: response.data, isLoadingCategory: false});
        })
        .catch((error) => {
          if (!isCancel(error)) {
            this.setState({error: true});
          }
        });
    });
  }

  render() {
    const {category, isLoadingCategory} = this.state;
    const {categorySlug} = this.props.match.params;
    return (
      isLoadingCategory ? 
        <Loader active inline='centered' />
      :
        <div>
          <Header as="h2">{category && category.title}</Header>

          <GraphGistList
            url="/graph_gists.json"
            params={{category: categorySlug}}
          />
        </div>
    );
  }
}

export default Category;
