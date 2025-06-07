import axios from 'axios';

const API_URL = 'http://localhost:3000/flats';

export const getFlatMessages = async (flatId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No se encontró el token de autenticación');
  }

  try {
    const response = await axios.get(`${API_URL}/${flatId}/messages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Error al obtener los mensajes');
    } else if (error.request) {
      throw new Error('No se recibió respuesta del servidor');
    } else {
      throw new Error('Error al configurar la petición');
    }
  }
}; 