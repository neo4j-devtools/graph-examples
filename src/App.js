import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import { Input, Menu, Segment, Dropdown, Label } from 'semantic-ui-react';
import axios, { CancelToken, isCancel } from './axios';
import Home from './components/Home';
import Category from './components/Category';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

class App extends Component {
  state = {
    useCases: [],
    industries: [],
    cancelRequestUseCases: null,
    cancelRequestIndustries: null
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

  render() {
    return (
      <BrowserRouter>
        <div id="app">
          <Menu pointing>
            <Menu.Item as={NavLink} to="/">Graph Gallery</Menu.Item>
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
            <Menu.Menu position='right'>
              <Menu.Item>
                <Input icon='search' placeholder='Search...' />
              </Menu.Item>
            </Menu.Menu>
          </Menu>

          <Segment>
            <Route path="/category/:categorySlug" component={Category} />
            <Route exact path="/" component={Home} />
          </Segment>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
