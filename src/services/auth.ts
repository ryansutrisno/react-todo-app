import axios from 'axios';

const API_BASE_URL = import.meta.env.BASE_URL;

export const authService = {
  async login(email: string, password: string) {
    const response = await axios.post(`${API_BASE_URL}/users/login`, {
      email,
      password
    });
    return response.data;
  },

  async register(email: string, password: string) {
    const response = await axios.post(`${API_BASE_URL}/users/register`, {
      email,
      password
    });
    return response.data;
  }
};