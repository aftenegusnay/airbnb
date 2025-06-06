import { useState } from 'react';
import { login, register } from '../adapter/authAdapter';

export const useAuth = () => {
  const [error, setError] = useState('');

  const handleLogin = async (email, password) => {
    try {
      const data = await login(email, password);
      setError('');
      if (data?.access_token) {
        localStorage.setItem('token', data.access_token);
      }
      return data?.access_token;
    } catch (err) {
      setError('Credenciales inválidas');
      throw err;
    }
  };

  const handleRegister = async (form) => {
    try {
      const data = await register(form);
      setError('');
      if (data?.access_token) {
        localStorage.setItem('token', data.access_token);
      }
      return data?.access_token;
    } catch (err) {
      setError('Error al registrar usuario');
      throw err;
    }
  };

  return { handleLogin, handleRegister, error };
}; 