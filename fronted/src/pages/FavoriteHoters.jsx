import React from 'react';
import Header from '../componentes/Header';
import HotelCard from '../componentes/HotelCard';
import { useFavoriteFlats } from '../hooks/useFlats';

function parseJwt(token) {
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

const FavoriteHoters = () => {
  const username = 'UserName';
  const { flats, loading, error } = useFavoriteFlats();
  const token = localStorage.getItem('token');
  const payload = parseJwt(token);
  const isAdmin = payload?.isAdmin;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-amber-100 p-2 sm:p-6">
      <div className="max-w-6xl mx-auto rounded-2xl border border-gray-200 overflow-hidden bg-white bg-opacity-60 shadow-xl">
        <Header username={username} isAdmin={isAdmin} />
        <main className="flex flex-col items-center p-4">
          <h2 className="text-xl font-semibold mb-6 mt-2 text-center">MIS HOTELES FAVORITOS</h2>
          {loading && <div className="text-blue-500">Cargando favoritos...</div>}
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex flex-wrap gap-6 justify-center w-full">
            {!loading && !error && flats.length === 0 && (
              <div className="text-gray-500">No tienes hoteles favoritos.</div>
            )}
            {flats.map((flat, idx) => (
              <HotelCard key={idx} {...flat} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default FavoriteHoters; 