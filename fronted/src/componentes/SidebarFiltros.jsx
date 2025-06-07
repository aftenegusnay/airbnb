import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';

const SidebarFiltros = ({ initialFiltros, onApplyFilters }) => {
  const [localFiltros, setLocalFiltros] = useState(initialFiltros);

  useEffect(() => {
    setLocalFiltros(initialFiltros);
  }, [initialFiltros]);

  const handleChange = (name, value) => {
    setLocalFiltros(f => ({ ...f, [name]: value }));
  };

  const handleSearch = () => {
    onApplyFilters(localFiltros);
  };

  const handleReset = () => {
    const resetValues = {
      city: '',
      minPrice: null,
      maxPrice: null,
      minArea: null,
      maxArea: null,
      hasAc: false,
      minYearBuilt: null,
      maxYearBuilt: null
    };
    setLocalFiltros(resetValues);
    onApplyFilters(resetValues);
  };

  return (
    <aside className="bg-white bg-opacity-90 rounded-2xl shadow p-4 w-full sm:w-64 mb-4 sm:mb-0">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">FILTROS</h2>
        <Button
          icon="pi pi-refresh"
          className="p-button-text p-button-rounded p-button-sm"
          onClick={handleReset}
          tooltip="Restablecer filtros"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="city" className="block text-sm text-gray-600 mb-1">Ciudad</label>
          <InputText
            id="city"
            className="w-full"
            placeholder="Buscar por ciudad"
            value={localFiltros.city}
            onChange={e => handleChange('city', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Precio por noche</label>
          <div className="flex flex-col gap-2">
            <InputNumber
              className="w-full"
              placeholder="Mín"
              value={localFiltros.minPrice}
              onValueChange={e => handleChange('minPrice', e.value)}
              mode="currency"
              currency="USD"
              locale="en-US"
            />
            <InputNumber
              className="w-full"
              placeholder="Máx"
              value={localFiltros.maxPrice}
              onValueChange={e => handleChange('maxPrice', e.value)}
              mode="currency"
              currency="USD"
              locale="en-US"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Área (m²)</label>
          <div className="flex flex-col gap-2">
            <InputNumber
              className="w-full"
              placeholder="Mín"
              value={localFiltros.minArea}
              onValueChange={e => handleChange('minArea', e.value)}
              suffix=" m²"
            />
            <InputNumber
              className="w-full"
              placeholder="Máx"
              value={localFiltros.maxArea}
              onValueChange={e => handleChange('maxArea', e.value)}
              suffix=" m²"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Año de construcción</label>
          <div className="flex flex-col gap-2">
            <InputNumber
              className="w-full"
              placeholder="Desde"
              value={localFiltros.minYearBuilt}
              onValueChange={e => handleChange('minYearBuilt', e.value)}
            />
            <InputNumber
              className="w-full"
              placeholder="Hasta"
              value={localFiltros.maxYearBuilt}
              onValueChange={e => handleChange('maxYearBuilt', e.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            inputId="hasAc"
            checked={localFiltros.hasAc}
            onChange={e => handleChange('hasAc', e.checked)}
          />
          <label htmlFor="hasAc" className="text-sm text-gray-600">Aire acondicionado</label>
        </div>

        <Button
          label="Buscar"
          icon="pi pi-search"
          className="p-button-primary mt-2 w-full"
          onClick={handleSearch}
        />
      </div>
    </aside>
  );
};

export default SidebarFiltros; 