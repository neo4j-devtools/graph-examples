import React, { Component } from 'react';
import { Header, Loader, Icon } from 'semantic-ui-react';
import axios, { CancelToken, isCancel } from '../axios';
import GraphGistList from './GraphGistList';

const initialState = {
  isLoadingPersonProfile: true,
  person: null,
  cancelRequest: null
};

class PersonProfile extends Component {
  state = initialState; 
  componentDidMount() {
    this.getPersonProfile();
  }

  componentWillUnmount() {
    const {cancelRequest} = this.state;
    if(typeof cancelRequest === 'function') {
      cancelRequest();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.getPersonProfile()
    }
  }

  getPersonProfile(params) {
    const {uuid} = this.props.match.params;

    this.setState(initialState, () => {
      axios.get(`/people/${uuid}.json`, {
        cancelToken: new CancelToken((cancelRequest) => {
          this.setState({cancelRequest});
        })
      })
        .then((response) => {
          this.setState({person: response.data, isLoadingPersonProfile: false});
        })
        .catch((error) => {
          if (!isCancel(error)) {
            this.setState({error: true});
          }
        });
    });
  }

  render() {
    const {person, isLoadingPersonProfile} = this.state;
    const {uuid} = this.props.match.params;
    return (
      isLoadingPersonProfile ? 
        <Loader active inline='centered' />
      :
        <div>
          <Header as="h2">
            <Header.Content>
              {person && person.name}
              {(person && person.twitter_username) && <Header.Subheader>
                <a href={`https://twitter.com/${person.twitter_username}`}><Icon name="twitter" /> {person.twitter_username}</a>
              </Header.Subheader>}
            </Header.Content>
          </Header>

          <GraphGistList
            url="/graph_gists.json"
            params={{author: uuid}}
          />
        </div>
    );
  }
}

export default PersonProfile;
