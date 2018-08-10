import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Input, Menu, Dropdown, Label, Loader } from 'semantic-ui-react';
import axios, { CancelToken, isCancel } from '../axios';
import { Auth0Lock } from 'auth0-lock';
import { getUserSuccess, getUserFailure, clearUser } from '../auth/actions';

const CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID;
const CLIENT_DOMAIN = process.env.REACT_APP_AUTH0_CLIENT_DOMAIN;
const SCOPE = 'openid email profile read:current_user';

class AppMenu extends Component {
  state = {
    useCases: [],
    industries: [],
    cancelRequestUseCases: null,
    cancelRequestIndustries: null,
    search: '',
    isLoadingProfile: false
  }

  componentDidMount() {
    axios.get('/industries.json', {
        cancelToken: new CancelToken((cancelRequestIndustries) => {
          this.setState({cancelRequestIndustries});
        })
      })
      .then((response) => {
        this.setState({industries: response.data});
      })
      .catch((error) => {
        if (!isCancel(error)) {
          this.setState({error: true});
        }
      });

    axios.get('/use_cases.json', {
        cancelToken: new CancelToken((cancelRequestUseCases) => {
          this.setState({cancelRequestUseCases});
        })
      })
      .then((response) => {
        this.setState({useCases: response.data});
      })
      .catch((error) => {
        if (!isCancel(error)) {
          this.setState({error: true});
        }
      });

    const auth = new Auth0Lock(CLIENT_ID, CLIENT_DOMAIN, {
      auth: {
        redirect: false,
        redirectUrl: window.location.origin,
        sso: false,
        responseType: 'code token id_token',
        params: {
          scope: SCOPE
        }
      }
    });
    auth.on('authenticated', (authResult) => {
      localStorage.setItem('auth', JSON.stringify(authResult));
      this.getUserProfile(authResult);
      auth.hide();
    });
    this.setState({auth});

    const authToken = localStorage.getItem('auth');
    if(authToken) {
      this.getUserProfile(JSON.parse(authToken));
    } 
  }

  componentWillUnmount() {
    const {cancelRequestUseCases, cancelRequestIndustries} = this.state;
    if(typeof cancelRequestUseCases === 'function') {
      cancelRequestUseCases();
    }
    if(typeof cancelRequestIndustries === 'function') {
      cancelRequestIndustries();
    }
  }

  getUserProfile(authToken) {
    this.setState({isLoadingProfile: true}, () => {
      axios.get('/users/auth/authtoken/callback', {
        params: {
          access_token: authToken.accessToken,
          state: authToken.state,
          token_type: authToken.tokenType,
          expires_in: authToken.expiresIn
        }
      })
        .then((response) => {
          this.props.getUserSuccess(response.data.user);
          this.setState({isLoadingProfile: false});
        })
        .catch((error) => {
          this.props.getUserFailure(error);
          localStorage.removeItem('auth');
          this.setState({isLoadingProfile: false});
        });
    });
  }

  handleSignOut = (e) => {
    e.preventDefault();
    this.props.clearUser();
    localStorage.removeItem('auth');
  }
  
  handleSearch = (e) => {
    this.setState({search: e.target.value});
    this.props.history.push(`/search/${e.target.value}`);
  }

  render() {
    const { user } = this.props.auth;
    const { isLoadingProfile } = this.state;

    return (
      <Menu pointing>
        <Menu.Item as={NavLink} to="/" exact>Graph Gallery</Menu.Item>
        <Dropdown item text='Use Cases'>
          <Dropdown.Menu className="categoriesList">
            {this.state.useCases.map((category) => {
              return <Dropdown.Item key={category.id} as={NavLink} to={`/category/${category.slug}`}>
                {category.image && <img
                  src={category.image}
                  width="30"
                  alt={category.title}
                />} {category.title} <Label>{category.num_graphgists}</Label>
              </Dropdown.Item>;
            })}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item text='Industries'>
          <Dropdown.Menu className="categoriesList">
            {this.state.industries.map((category) => {
              return <Dropdown.Item key={category.id} as={NavLink} to={`/category/${category.slug}`}>
                {category.image && <img
                  src={category.image}
                  width="30"
                  alt={category.title}
                />} {category.title} <Label>{category.num_graphgists}</Label>
              </Dropdown.Item>;
            })}
          </Dropdown.Menu>
        </Dropdown>
        { user && <Menu.Item as={NavLink} to="/my-graphgists">My Graphgists</Menu.Item>}
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input
              icon='search'
              placeholder='Search...'
              onChange={this.handleSearch}
              value={this.state.search}
            />
          </Menu.Item>
          { !user && <Menu.Item onClick={() => {this.state.auth.show()}}>{isLoadingProfile ? <Loader inline active /> : 'Sign in'}</Menu.Item>}
          { user && <Menu.Item onClick={this.handleSignOut}>Sign out</Menu.Item>}
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({getUserSuccess, getUserFailure, clearUser}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppMenu));
