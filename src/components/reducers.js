import * as Types from './action.types';

export default function neo4j(state = getInitialState(), action) {
  switch (action.type) {
    case Types.SET_NEO4J_BROWSER_URL:
      return {
        ...state,
        browserURL: action.url
      };
    default:
      return state;
  }
}

function getInitialState() {
  return {
    browserURL: 'http://localhost:7474/browser'
  }
}
