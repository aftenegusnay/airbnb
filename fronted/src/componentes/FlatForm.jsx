import React, { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import { createFlat, updateFlat } from '../adapter/flatsAdapter';

const FlatForm = ({ flat, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    city: '',
    streetName: '',
    streetNumber: null,
    areaSize: null,
    hasAc: false,
    yearBuilt: null,
    rentPrice: null,
    dateAvailable: null
  });
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    if (flat) {
      setFormData({
        city: flat.city || '',
        streetName: flat.streetName || '',
        streetNumber: flat.streetNumber || null,
        areaSize: flat.areaSize || null,
        hasAc: flat.hasAc || false,
        yearBuilt: flat.yearBuilt || null,
        rentPrice: flat.rentPrice ? parseFloat(flat.rentPrice) : null,
        dateAvailable: flat.dateAvailable ? new Date(flat.dateAvailable) : null
      });
    }
  }, [flat]);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (flat) {
        await updateFlat(flat.id, formData);
        toast.current.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Hotel actualizado correctamente',
          life: 3000
        });
      } else {
        await createFlat(formData);
        toast.current.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Hotel creado correctamente',
          life: 3000
        });
      }
      onSuccess();
    } catch (error) {
      console.error('Error:', error);
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: error.message || 'Ocurrió un error al procesar la solicitud',
        life: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Toast ref={toast} position="top-center" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            Ciudad *
          </label>
          <InputText
            id="city"
            value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)}
            className="w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="streetName" className="block text-sm font-medium text-gray-700 mb-1">
            Calle *
          </label>
          <InputText
            id="streetName"
            value={formData.streetName}
            onChange={(e) => handleChange('streetName', e.target.value)}
            className="w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="streetNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Número *
          </label>
          <InputNumber
            id="streetNumber"
            value={formData.streetNumber}
            onValueChange={(e) => handleChange('streetNumber', e.value)}
            className="w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="areaSize" className="block text-sm font-medium text-gray-700 mb-1">
            Área (m²) *
          </label>
          <InputNumber
            id="areaSize"
            value={formData.areaSize}
            onValueChange={(e) => handleChange('areaSize', e.value)}
            className="w-full"
            suffix=" m²"
            required
          />
        </div>

        <div>
          <label htmlFor="yearBuilt" className="block text-sm font-medium text-gray-700 mb-1">
            Año de Construcción *
          </label>
          <InputNumber
            id="yearBuilt"
            value={formData.yearBuilt}
            onValueChange={(e) => handleChange('yearBuilt', e.value)}
            className="w-full"
            min={1900}
            max={new Date().getFullYear()}
            required
          />
        </div>

        <div>
          <label htmlFor="rentPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Precio por Noche *
          </label>
          <InputNumber
            id="rentPrice"
            value={formData.rentPrice}
            onValueChange={(e) => handleChange('rentPrice', e.value)}
            className="w-full"
            mode="currency"
            currency="USD"
            locale="en-US"
            required
          />
        </div>

        <div>
          <label htmlFor="dateAvailable" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha Disponible *
          </label>
          <Calendar
            id="dateAvailable"
            value={formData.dateAvailable}
            onChange={(e) => handleChange('dateAvailable', e.value)}
            className="w-full"
            showIcon
            required
          />
        </div>

        <div className="flex items-center">
          <Checkbox
            id="hasAc"
            checked={formData.hasAc}
            onChange={(e) => handleChange('hasAc', e.checked)}
          />
          <label htmlFor="hasAc" className="ml-2 text-sm font-medium text-gray-700">
            Aire Acondicionado
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <Button
          type="button"
          label="Cancelar"
          className="p-button-text"
          onClick={onCancel}
        />
        <Button
          type="submit"
          label={flat ? "Actualizar Hotel" : "Crear Hotel"}
          icon={flat ? "pi pi-save" : "pi pi-plus"}
          loading={loading}
        />
      </div>
    </form>
  );
};

export default FlatForm; 