import axios from 'axios';

const API_BASE_URL = import.meta.env.BASE_URL;

export const todoService = {
  async getAllTodos(token: string) {
    const response = await axios.get(`${API_BASE_URL}/todos`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  async createTodo(token: string, title: string, description: string) {
    const response = await axios.post(`${API_BASE_URL}/todos`, {
      title,
      description
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  async updateTodo(token: string, id: number, title: string, description: string) {
    const response = await axios.put(`${API_BASE_URL}/todos/${id}`, {
      title,
      description
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  async deleteTodo(token: string, id: number) {
    const response = await axios.delete(`${API_BASE_URL}/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  async searchTodos(token: string, params: unknown) {
    const response = await axios.get(`${API_BASE_URL}/todos/search`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params
    });
    return response.data;
  }
};