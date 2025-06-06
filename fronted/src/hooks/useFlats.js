import { useState, useEffect } from 'react';
import { getAllFlats, getFavoriteFlats } from '../adapter/flatsAdapter';

export const useFlats = () => {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlats = async () => {
      try {
        const data = await getAllFlats();
        setFlats(data);
      } catch (err) {
        setError('Error al obtener los alojamientos');
      } finally {
        setLoading(false);
      }
    };
    fetchFlats();
  }, []);

  return { flats, loading, error };
};

export const useFavoriteFlats = () => {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlats = async () => {
      try {
        const data = await getFavoriteFlats();
        setFlats(data);
      } catch (err) {
        setError('Error al obtener favoritos');
      } finally {
        setLoading(false);
      }
    };
    fetchFlats();
  }, []);

  return { flats, loading, error };
}; 