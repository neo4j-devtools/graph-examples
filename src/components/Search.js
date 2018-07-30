import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import GraphGistList from './GraphGistList';

class Search extends Component {
  render() {
    const {query} = this.props.match.params;

    return (
      <div>
        <Header as='h2'>Search for {query}</Header>
        <GraphGistList url={`/graph_gists/search_by_title_category_and_author/${query}.json`} />
      </div>
    );
  }
}

export default Search;
