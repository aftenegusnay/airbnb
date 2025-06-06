import React from 'react';

const SidebarFiltros = ({ filtros, setFiltros }) => (
  <aside className="bg-white bg-opacity-90 rounded-2xl shadow p-4 w-full sm:w-48 mb-4 sm:mb-0">
    <h2 className="text-lg font-semibold mb-4 text-gray-700">FILTROS</h2>
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-xs text-gray-500 mb-1">Ciudad</label>
        <input
          type="text"
          className="w-full border rounded px-2 py-1"
          placeholder="Ciudad"
          value={filtros.city}
          onChange={e => setFiltros(f => ({ ...f, city: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Precio mínimo</label>
        <input
          type="number"
          className="w-full border rounded px-2 py-1"
          placeholder="Mínimo"
          value={filtros.minPrice}
          onChange={e => setFiltros(f => ({ ...f, minPrice: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Precio máximo</label>
        <input
          type="number"
          className="w-full border rounded px-2 py-1"
          placeholder="Máximo"
          value={filtros.maxPrice}
          onChange={e => setFiltros(f => ({ ...f, maxPrice: e.target.value }))}
        />
      </div>
    </div>
  </aside>
);

export default SidebarFiltros; 