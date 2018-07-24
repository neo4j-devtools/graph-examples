import axios from 'axios';

export const BASE_API_URL = 'https://portal.graphgist.org'; 

export const CancelToken = axios.CancelToken;
export const isCancel = axios.isCancel;

const instance = axios.create({
  baseURL: BASE_API_URL
});
export default instance;

