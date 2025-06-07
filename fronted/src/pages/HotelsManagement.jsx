import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { getAllFlats, deleteFlat } from '../adapter/flatsAdapter';
import FlatForm from '../componentes/FlatForm';
import Header from '../componentes/Header';

const HotelsManagement = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const toast = useRef(null);

  const fetchHotels = async () => {
    try {
      const data = await getAllFlats();
      setHotels(data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al cargar los hoteles',
        life: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleEdit = (hotel) => {
    setSelectedHotel(hotel);
    setShowForm(true);
  };

  const handleDelete = (hotel) => {
    confirmDialog({
      message: '¿Estás seguro de que deseas eliminar este hotel?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        try {
          await deleteFlat(hotel.id);
          toast.current.show({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Hotel eliminado correctamente',
            life: 3000
          });
          fetchHotels();
        } catch (error) {
          console.error('Error deleting hotel:', error);
          toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: error.message || 'Error al eliminar el hotel',
            life: 3000
          });
        }
      }
    });
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setSelectedHotel(null);
    fetchHotels();
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-text"
          onClick={() => handleEdit(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-text p-button-danger"
          onClick={() => handleDelete(rowData)}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-amber-100">
      <Header />
      <div className="p-4">
        <Toast ref={toast} position="top-center" />
        <ConfirmDialog />

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Gestión de Hoteles</h1>
          <Button
            label="Nuevo Hotel"
            icon="pi pi-plus"
            onClick={() => {
              setSelectedHotel(null);
              setShowForm(true);
            }}
          />
        </div>

        <DataTable
          value={hotels}
          loading={loading}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 20]}
          className="p-datatable-sm"
        >
          <Column field="city" header="Ciudad" sortable />
          <Column field="streetName" header="Calle" sortable />
          <Column field="streetNumber" header="Número" sortable />
          <Column field="areaSize" header="Área (m²)" sortable />
          <Column field="rentPrice" header="Precio por Noche" sortable body={(rowData) => `$${rowData.rentPrice}`} />
          <Column field="yearBuilt" header="Año" sortable />
          <Column field="hasAc" header="A/C" body={(rowData) => rowData.hasAc ? 'Sí' : 'No'} />
          <Column field="dateAvailable" header="Disponible" sortable body={(rowData) => new Date(rowData.dateAvailable).toLocaleDateString()} />
          <Column body={actionBodyTemplate} header="Acciones" />
        </DataTable>

        <Dialog
          visible={showForm}
          onHide={() => setShowForm(false)}
          header={selectedHotel ? "Editar Hotel" : "Nuevo Hotel"}
          style={{ width: '80vw' }}
          maximizable
        >
          <FlatForm
            flat={selectedHotel}
            onSuccess={handleFormSuccess}
            onCancel={() => setShowForm(false)}
          />
        </Dialog>
      </div>
    </div>
  );
};

export default HotelsManagement; 