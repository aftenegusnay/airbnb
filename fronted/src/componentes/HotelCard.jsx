import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { favoriteFlat, sendMessageToFlat } from '../adapter/flatsAdapter';
import { Toast } from 'primereact/toast';

const HotelCard = ({ nombre = 'Hotel Demo', descripcion = 'Información de Hotel', id, ...flat }) => {
  const [visible, setVisible] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [favSuccess, setFavSuccess] = useState(false);
  const [favError, setFavError] = useState('');
  const [message, setMessage] = useState('');
  const [msgLoading, setMsgLoading] = useState(false);
  const toast = React.useRef(null);

  const handleFavorite = async () => {
    setFavLoading(true);
    setFavError('');
    try {
      await favoriteFlat(id);
      setFavSuccess(true);
      setTimeout(() => setFavSuccess(false), 2000);
    } catch (err) {
      setFavError('Error al agregar a favoritos');
    } finally {
      setFavLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setMsgLoading(true);
    try {
      await sendMessageToFlat(id, message);
      toast.current.show({ severity: 'success', summary: 'Mensaje enviado', life: 2000 });
      setMessage('');
    } catch (err) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo enviar el mensaje', life: 3000 });
    } finally {
      setMsgLoading(false);
    }
  };

  return (
    <>
      <div
        className="bg-white rounded-xl shadow p-4 mb-4 w-full max-w-xs mx-auto border border-gray-200 hover:shadow-lg transition flex flex-col items-center"
      >
        <h3 className="font-bold text-blue-600 mb-2">{nombre}</h3>
        <p className="text-gray-700 text-sm mb-2">{descripcion}</p>
        <Button label="Ver más info" icon="pi pi-info-circle" className="p-button-text p-button-sm" onClick={() => setVisible(true)} />
      </div>
      <Dialog header={nombre} visible={visible} style={{ width: '90vw', maxWidth: 500 }} onHide={() => setVisible(false)}>
        <Toast ref={toast} position="top-center" />
        <div className="space-y-2 mb-4">
          <div><span className="font-semibold">Ciudad:</span> {flat.city}</div>
          <div><span className="font-semibold">Dirección:</span> {flat.streetName} #{flat.streetNumber}</div>
          <div><span className="font-semibold">Área:</span> {flat.areaSize} m²</div>
          <div><span className="font-semibold">A/C:</span> {flat.hasAc ? 'Sí' : 'No'}</div>
          <div><span className="font-semibold">Año construcción:</span> {flat.yearBuilt}</div>
          <div><span className="font-semibold">Precio renta:</span> ${flat.rentPrice}</div>
          <div><span className="font-semibold">Disponible desde:</span> {flat.dateAvailable && new Date(flat.dateAvailable).toLocaleDateString()}</div>
          {flat.owner && (
            <div><span className="font-semibold">Propietario:</span> {flat.owner.firstName} {flat.owner.lastName} ({flat.owner.email})</div>
          )}
        </div>
        <Button
          label={favSuccess ? "¡Agregado a favoritos!" : "Agregar a favoritos"}
          icon={favSuccess ? "pi pi-check" : "pi pi-star"}
          className={`w-full ${favSuccess ? 'p-button-success' : ''}`}
          onClick={handleFavorite}
          loading={favLoading}
          disabled={favSuccess}
        />
        {favError && <div className="text-red-500 mt-2">{favError}</div>}
        <form className="mt-6 flex flex-col gap-2" onSubmit={handleSendMessage}>
          <label className="font-semibold">Enviar mensaje al propietario:</label>
          <textarea
            className="w-full border rounded px-2 py-1"
            rows={3}
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje..."
            required
          />
          <Button
            type="submit"
            label={msgLoading ? 'Enviando...' : 'Enviar mensaje'}
            icon="pi pi-send"
            className="w-full"
            disabled={msgLoading || !message.trim()}
          />
        </form>
      </Dialog>
    </>
  );
};

export default HotelCard; 