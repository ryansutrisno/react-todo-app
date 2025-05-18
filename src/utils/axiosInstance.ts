import axios from 'axios';
import { store } from '../stores/store';
import { logout } from '../stores/authSlice';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (
      error.response &&
      error.response.status === 403 &&
      error.response.data?.message === 'Invalid or expired token'
    ) {
      store.dispatch(logout());
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;