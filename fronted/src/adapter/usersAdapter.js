import axios from 'axios';

const API_URL = 'http://localhost:3000/users';

export const getAllUsers = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const toggleUserAdminStatus = async (userId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  const response = await axios.patch(`${API_URL}/${userId}/admin`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}; 