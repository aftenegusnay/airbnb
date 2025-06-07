import React, { useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { favoriteFlat, sendMessageToFlat, addToFavorites, removeFromFavorites } from '../adapter/flatsAdapter';
import { Toast } from 'primereact/toast';
import { InputTextarea } from 'primereact/inputtextarea';
import MessagesList from './MessagesList';

const HotelCard = ({ id, city, streetName, streetNumber, areaSize, hasAc, yearBuilt, rentPrice, dateAvailable, isInitiallyFavorited = false, onFavoriteChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [isFavorited, setIsFavorited] = useState(isInitiallyFavorited);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  // Generar una imagen aleatoria de Unsplash basada en la ciudad
  const getRandomImage = () => {
    const searchTerms = ['apartment', 'hotel', 'interior', 'room', 'house'];
    const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
    return `https://source.unsplash.com/featured/?${randomTerm},${city}`;
  };

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    try {
      if (isFavorited) {
        await removeFromFavorites(id);
        toast.current.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Hotel removido de favoritos',
          life: 3000
        });
      } else {
        await addToFavorites(id);
        toast.current.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Hotel agregado a favoritos',
          life: 3000
        });
      }
      setIsFavorited(!isFavorited);
      if (onFavoriteChange) {
        onFavoriteChange(id, !isFavorited);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: error.message || 'Error al actualizar favoritos',
        life: 3000
      });
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast.current.show({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor, escribe un mensaje',
        life: 3000
      });
      return;
    }

    try {
      setLoading(true);
      await sendMessageToFlat(id, message);
      setMessage('');
      toast.current.show({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Mensaje enviado correctamente',
        life: 3000
      });
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo enviar el mensaje',
        life: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  const renderModalContent = () => (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-4">Detalles del Hotel</h3>
          <div className="space-y-2">
            <p><strong>Ciudad:</strong> {city}</p>
            <p><strong>Dirección:</strong> {streetName} #{streetNumber}</p>
            <p><strong>Área:</strong> {areaSize} m²</p>
            <p><strong>Aire Acondicionado:</strong> {hasAc ? 'Sí' : 'No'}</p>
            <p><strong>Año de Construcción:</strong> {yearBuilt}</p>
            <p><strong>Precio por Noche:</strong> ${parseFloat(rentPrice).toFixed(2)}</p>
            <p><strong>Disponible desde:</strong> {dateAvailable ? new Date(dateAvailable).toLocaleDateString() : 'N/A'}</p>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Mensajes</h3>
          <MessagesList flatId={id} />
          <div className="mt-4">
            <InputTextarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje aquí..."
              rows={3}
              className="w-full mb-2"
            />
            <Button
              label="Enviar Mensaje"
              icon="pi pi-send"
              onClick={handleSendMessage}
              loading={loading}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Toast ref={toast} position="top-center" />
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative">
          <img
            src={getRandomImage()}
            alt={`${city} - ${streetName}`}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          <Button
            icon={isFavorited ? "pi pi-star-fill" : "pi pi-star"}
            className={`p-button-rounded p-button-text absolute top-2 right-2 ${
              isFavorited ? "text-yellow-500" : "text-white"
            }`}
            onClick={handleFavoriteClick}
            loading={loading}
            tooltip={isFavorited ? "Quitar de favoritos" : "Agregar a favoritos"}
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{city}</h3>
          <p className="text-gray-600 mb-2">{streetName} #{streetNumber}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-blue-600">
              ${parseFloat(rentPrice).toFixed(2)}/noche
            </span>
            <Button
              label="Ver Detalles"
              icon="pi pi-info-circle"
              className="p-button-text"
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
            />
          </div>
        </div>
      </div>

      <Dialog
        header={
          <div className="flex justify-between items-center w-full">
            <h2 className="text-xl font-bold">{city}</h2>
            <Button
              icon={isFavorited ? "pi pi-star-fill" : "pi pi-star"}
              className={`p-button-rounded p-button-text ${isFavorited ? 'text-yellow-500' : ''}`}
              onClick={handleFavoriteClick}
              tooltip={isFavorited ? "Quitar de favoritos" : "Agregar a favoritos"}
            />
          </div>
        }
        visible={showModal}
        style={{ width: '90vw', maxWidth: '1200px' }}
        onHide={() => setShowModal(false)}
        maximizable
      >
        {renderModalContent()}
      </Dialog>
    </>
  );
};

export default HotelCard; 