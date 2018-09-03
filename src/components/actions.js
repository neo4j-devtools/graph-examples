import * as Types from './action.types';

export function setNeo4jBrowserUrl(url) {
  return { type: Types.SET_NEO4J_BROWSER_URL, url};
}

export function setNeo4jCurrentDB(graphName) {
  return { type: Types.SET_NEO4J_CURRENT_DB, graphName};
}
