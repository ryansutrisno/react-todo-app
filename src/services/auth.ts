import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const authService = {
  async login(email: string, password: string) {
    const response = await axios.post(`${API_BASE_URL}/users/login`, {
      user_name: email,
      user_password: password,
    });
    return response.data;
  },

  async register(email: string, password: string) {
    const response = await axios.post(`${API_BASE_URL}/users/register`, {
        user_name: email,
        user_password: password,
    });
    return response.data;
  }
};