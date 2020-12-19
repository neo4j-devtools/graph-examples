import React from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Input, Menu, Dropdown, Label } from 'semantic-ui-react';
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import _ from "lodash";
import { getUserSuccess, getUserFailure, clearUser } from '../auth/actions';
import { getImage } from './GraphGistCard';

const graphql = gql`
  query AppMenu {
    UseCase {
      slug
      name
      num_graphgists
      image(first: 1) {
        source_url
      }
    }
    Industry {
      slug
      name
      num_graphgists
      image(first: 1) {
        source_url
      }
    }
  }
`

function AppMenu(props) {
  /*
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
  */

  // getUserProfile(authToken) {
  //   this.setState({isLoadingProfile: true}, () => {
  //     axios.get('/users/auth/authtoken/callback', {
  //       params: {
  //         access_token: authToken.accessToken,
  //         state: authToken.state,
  //         token_type: authToken.tokenType,
  //         expires_in: authToken.expiresIn
  //       }
  //     })
  //       .then((response) => {
  //         this.props.getUserSuccess(response.data.user);
  //         this.setState({isLoadingProfile: false});
  //       })
  //       .catch((error) => {
  //         this.props.getUserFailure(error);
  //         localStorage.removeItem('auth');
  //         this.setState({isLoadingProfile: false});
  //       });
  //   });
  // }

  // handleSignOut = (e) => {
  //   e.preventDefault();
  //   this.props.clearUser();
  //   localStorage.removeItem('auth');
  // }
  
  const [search, setSearch] = React.useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
    props.history.push(`/search/${e.target.value}`);
  }

  // const { user } = this.props.auth;
  // const { isLoadingProfile } = this.state;

  const { data } = useQuery(graphql, {
    fetchPolicy: "cache-and-network",
  });

  const useCases = _.get(data, 'UseCase', []);
  const industries = _.get(data, 'Industry', []);

  return (
    <Menu pointing>
      <Menu.Item as={NavLink} to="/" exact>Graph Examples</Menu.Item>
      <Dropdown item text='Use Cases'>
        <Dropdown.Menu className="categoriesList">
          {useCases.map((category) => {
            const category_image = getImage(category.image);
            return <Dropdown.Item key={category.slug} as={NavLink} to={`/category/${category.slug}`}>
              {category_image && <img
                src={category_image}
                width="30"
                alt={category.name}
              />} {category.name} <Label>{category.num_graphgists}</Label>
            </Dropdown.Item>;
          })}
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown item text='Industries'>
        <Dropdown.Menu className="categoriesList">
          {industries.map((category) => {
            const category_image = getImage(category.image);
            return <Dropdown.Item key={category.slug} as={NavLink} to={`/category/${category.slug}`}>
              {category_image && <img
                src={category_image}
                width="30"
                alt={category.name}
              />} {category.name} <Label>{category.num_graphgists}</Label>
            </Dropdown.Item>;
          })}
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Item as={NavLink} to="/graph-guides" exact>Browser Guides</Menu.Item>
      {props.neo4j.graphName && <Menu.Item>Connected to Graph: {props.neo4j.graphName}</Menu.Item>}
      {/* user && <Menu.Item as={NavLink} to="/my-graphgists">My Graphgists</Menu.Item> */}
      <Menu.Menu position='right'>
        <Menu.Item>
          <Input
            icon='search'
            placeholder='Search...'
            onChange={handleSearch}
            value={search}
          />
        </Menu.Item>
        {/* !user && <Menu.Item onClick={() => {this.state.auth.show()}}>{isLoadingProfile ? <Loader inline active /> : 'Sign in'}</Menu.Item>}
        { user && <Menu.Item onClick={this.handleSignOut}>Sign out</Menu.Item> */}
      </Menu.Menu>
    </Menu>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    neo4j: state.neo4j
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({getUserSuccess, getUserFailure, clearUser}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppMenu));
