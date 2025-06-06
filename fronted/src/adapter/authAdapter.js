import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const register = async (data) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
}; 