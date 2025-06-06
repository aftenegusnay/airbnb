import { useState, useEffect } from 'react';
import { getMe } from '../adapter/userAdapter';

export const useMe = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const data = await getMe();
        setUser(data);
      } catch (err) {
        setError('Error al obtener el perfil');
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, []);

  return { user, loading, error };
}; 