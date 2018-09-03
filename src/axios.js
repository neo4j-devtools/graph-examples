import axios from 'axios';

export const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export const CancelToken = axios.CancelToken;
export const isCancel = axios.isCancel;

const instance = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true
});
export default instance;

