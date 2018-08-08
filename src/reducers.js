import {combineReducers} from 'redux';
import auth from './auth/reducers';
import neo4j from './components/reducers';

const rootReducer = combineReducers({
  auth,
  neo4j
});

export default rootReducer;
