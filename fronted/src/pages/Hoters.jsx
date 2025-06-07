import React, { useState, useMemo, useCallback } from 'react';
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
  const { flats, loading, error } = useFlats();

  const defaultFiltros = useMemo(() => ({
    city: '',
    minPrice: null,
    maxPrice: null,
    minArea: null,
    maxArea: null,
    hasAc: false,
    minYearBuilt: null,
    maxYearBuilt: null
  }), []);

  const [appliedFiltros, setAppliedFiltros] = useState(defaultFiltros);

  // Detectar si es admin y obtener username desde el token
  const token = localStorage.getItem('token');
  const payload = parseJwt(token);
  const username = payload?.firstName || payload?.email || 'Usuario'; // Obtener el nombre o email del token
  const isAdmin = payload?.isAdmin;

  const handleApplyFilters = useCallback((newFiltros) => {
    setAppliedFiltros(newFiltros);
  }, []);

  const flatsFiltrados = useMemo(() => {
    return flats.filter(flat => {
      const cityMatch = appliedFiltros.city ? flat.city?.toLowerCase().includes(appliedFiltros.city.toLowerCase()) : true;
      const minPriceMatch = appliedFiltros.minPrice ? parseFloat(flat.rentPrice) >= parseFloat(appliedFiltros.minPrice) : true;
      const maxPriceMatch = appliedFiltros.maxPrice ? parseFloat(flat.rentPrice) <= parseFloat(appliedFiltros.maxPrice) : true;
      const minAreaMatch = appliedFiltros.minArea ? parseFloat(flat.areaSize) >= parseFloat(appliedFiltros.minArea) : true;
      const maxAreaMatch = appliedFiltros.maxArea ? parseFloat(flat.areaSize) <= parseFloat(appliedFiltros.maxArea) : true;
      const hasAcMatch = appliedFiltros.hasAc ? flat.hasAc === true : true;
      const minYearMatch = appliedFiltros.minYearBuilt ? flat.yearBuilt >= parseInt(appliedFiltros.minYearBuilt) : true;
      const maxYearMatch = appliedFiltros.maxYearBuilt ? flat.yearBuilt <= parseInt(appliedFiltros.maxYearBuilt) : true;

      return cityMatch && minPriceMatch && maxPriceMatch && minAreaMatch && maxAreaMatch && hasAcMatch && minYearMatch && maxYearMatch;
    });
  }, [flats, appliedFiltros]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-amber-100 p-2 sm:p-6">
      <div className="max-w-7xl mx-auto rounded-2xl border border-gray-200 overflow-hidden bg-white bg-opacity-60 shadow-xl">
        <Header username={username} isAdmin={isAdmin} />
        <div className="flex flex-col sm:flex-row gap-4 p-4">
          <div className="sm:w-64 w-full">
            <SidebarFiltros initialFiltros={defaultFiltros} onApplyFilters={handleApplyFilters} />
          </div>
          <main className="flex-1 flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">TODOS LOS HOTELES</h2>
              <span className="text-sm text-gray-600">
                {flatsFiltrados.length} {flatsFiltrados.length === 1 ? 'hotel encontrado' : 'hoteles encontrados'}
              </span>
            </div>
            {loading && <div className="text-blue-500">Cargando hoteles...</div>}
            {error && <div className="text-red-500">{error}</div>}
            <div className="flex flex-wrap gap-6 justify-center w-full">
              {!loading && !error && flatsFiltrados.length === 0 && (
                <div className="text-gray-500 text-center py-8">
                  <i className="pi pi-search text-4xl mb-2 block"></i>
                  <p>No se encontraron hoteles que coincidan con los filtros seleccionados.</p>
                </div>
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