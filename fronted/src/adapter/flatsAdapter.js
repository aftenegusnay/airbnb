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
  if (!token) {
    throw new Error('No se encontró el token de autenticación');
  }

  try {
    const response = await axios.post(`${API_URL}/${id}/messages`, { content: message }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Error al enviar el mensaje');
    } else if (error.request) {
      throw new Error('No se recibió respuesta del servidor');
    } else {
      throw new Error('Error al configurar la petición');
    }
  }
};

export const deleteFlat = async (id) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No se encontró el token de autenticación');
  }

  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      throw new Error(error.response.data.message || 'Error al eliminar el hotel');
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      throw new Error('No se recibió respuesta del servidor');
    } else {
      // Algo sucedió al configurar la petición
      throw new Error('Error al configurar la petición');
    }
  }
};

export const createFlat = async (flatData) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No se encontró el token de autenticación');
  }

  try {
    const response = await axios.post(API_URL, flatData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Error al crear el hotel');
    } else if (error.request) {
      throw new Error('No se recibió respuesta del servidor');
    } else {
      throw new Error('Error al configurar la petición');
    }
  }
};

export const updateFlat = async (id, flatData) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No se encontró el token de autenticación');
  }

  try {
    const response = await axios.patch(`${API_URL}/${id}`, flatData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Error al actualizar el hotel');
    } else if (error.request) {
      throw new Error('No se recibió respuesta del servidor');
    } else {
      throw new Error('Error al configurar la petición');
    }
  }
};

export const addToFavorites = async (flatId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No se encontró el token de autenticación');
  }

  try {
    const response = await fetch(`${API_URL}/${flatId}/favorite`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al agregar a favoritos');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw new Error(error.message || 'Error al agregar a favoritos');
  }
};

export const removeFromFavorites = async (flatId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No se encontró el token de autenticación');
  }

  try {
    const response = await fetch(`${API_URL}/${flatId}/favorite`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al remover de favoritos');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw new Error(error.message || 'Error al remover de favoritos');
  }
}; 