import React, { useState, useMemo } from 'react';
import Header from '../componentes/Header';
import SidebarFiltros from '../componentes/SidebarFiltros';
import HotelCard from '../componentes/HotelCard';
import { useFlats } from '../hooks/useFlats';

function parseJwt(token) {
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

const Hoters = () => {
  const username = 'UserName';
  const { flats, loading, error } = useFlats();
  const [filtros, setFiltros] = useState({ city: '', minPrice: '', maxPrice: '' });

  // Detectar si es admin desde el token
  const token = localStorage.getItem('token');
  const payload = parseJwt(token);
  const isAdmin = payload?.isAdmin;

  const flatsFiltrados = useMemo(() => {
    return flats.filter(flat => {
      const cityMatch = filtros.city ? flat.city?.toLowerCase().includes(filtros.city.toLowerCase()) : true;
      const minPriceMatch = filtros.minPrice ? parseFloat(flat.rentPrice) >= parseFloat(filtros.minPrice) : true;
      const maxPriceMatch = filtros.maxPrice ? parseFloat(flat.rentPrice) <= parseFloat(filtros.maxPrice) : true;
      return cityMatch && minPriceMatch && maxPriceMatch;
    });
  }, [flats, filtros]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-amber-100 p-2 sm:p-6">
      <div className="max-w-6xl mx-auto rounded-2xl border border-gray-200 overflow-hidden bg-white bg-opacity-60 shadow-xl">
        <Header username={username} isAdmin={isAdmin} />
        <div className="flex flex-col sm:flex-row gap-4 p-4">
          <div className="sm:w-48 w-full">
            <SidebarFiltros filtros={filtros} setFiltros={setFiltros} />
          </div>
          <main className="flex-1 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-6 mt-2 text-center">TODOS LOS HOTELES</h2>
            {loading && <div className="text-blue-500">Cargando hoteles...</div>}
            {error && <div className="text-red-500">{error}</div>}
            <div className="flex flex-wrap gap-6 justify-center w-full">
              {!loading && !error && flatsFiltrados.length === 0 && (
                <div className="text-gray-500">No hay hoteles disponibles.</div>
              )}
              {flatsFiltrados.map((flat, idx) => (
                <HotelCard key={idx} {...flat} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Hoters; 