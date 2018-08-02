import axios from 'axios';

// export const BASE_API_URL = 'https://portal.graphgist.org'; 
export const BASE_API_URL = 'https://graph-gist-portal-staging.herokuapp.com'; 
// export const BASE_API_URL = 'http://graphgist-portal.local:3000'; 

export const CancelToken = axios.CancelToken;
export const isCancel = axios.isCancel;

const instance = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true
});
export default instance;

