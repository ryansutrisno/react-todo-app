import axiosInstance from '../utils/axiosInstance';

export const todoService = {
  async getAllTodos(token: string) {
    const response = await axiosInstance.get('/todos', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  async createTodo(token: string, title: string, description: string) {
    const response = await axiosInstance.post('/todos', {
      title,
      description
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  async updateTodo(token: string, id: number, title: string, description: string, completed?: boolean) {
    const response = await axiosInstance.put(`/todos/${id}`, {
      title,
      description,
      ...(completed !== undefined && { completed })
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  async deleteTodo(token: string, id: number) {
    const response = await axiosInstance.delete(`/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  async searchTodos(token: string, params: unknown) {
    const response = await axiosInstance.get(`/todos/search`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params
    });
    return response.data;
  }
};