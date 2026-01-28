import axios, { type AxiosInstance } from 'axios';

/**
 * Typed Axios instance.
 */
const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

export default api;