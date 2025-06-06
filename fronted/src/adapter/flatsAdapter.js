import axios from 'axios';

const API_URL = 'http://localhost:3000/flats';

export const getAllFlats = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const favoriteFlat = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/${id}/favorite`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getFavoriteFlats = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/favorites`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const sendMessageToFlat = async (id, message) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/${id}/messages`, { message }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}; 