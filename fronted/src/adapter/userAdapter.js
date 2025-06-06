import axios from 'axios';

const API_URL = 'http://localhost:3000/users/me';

export const getMe = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateMe = async (data) => {
  const token = localStorage.getItem('token');
  const response = await axios.patch('http://localhost:3000/users', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}; 