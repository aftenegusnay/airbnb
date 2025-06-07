import React, { useEffect, useState, useRef } from 'react';
import { getFlatMessages } from '../adapter/messagesAdapter';
import { Toast } from 'primereact/toast';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const MessagesList = ({ flatId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const data = await getFlatMessages(flatId);
        setMessages(data);
        setError(null);
      } catch (err) {
        console.error('Error al cargar mensajes:', err);
        setError('No se pudieron cargar los mensajes');
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: err.message || 'Error al cargar los mensajes',
          life: 3000
        });
      } finally {
        setLoading(false);
      }
    };

    if (flatId) {
      fetchMessages();
    }
  }, [flatId]);

  if (loading) {
    return <div className="text-center py-4">Cargando mensajes...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  if (messages.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        <i className="pi pi-comments text-4xl mb-2 block"></i>
        <p>No hay mensajes para este departamento.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Toast ref={toast} position="top-center" />
      {messages.map((message) => (
        <div
          key={message.id}
          className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="font-semibold text-gray-800">
                {message.sender.firstName} {message.sender.lastName}
              </span>
              <span className="text-sm text-gray-500 ml-2">
                {format(new Date(message.created), "d 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es })}
              </span>
            </div>
          </div>
          <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
        </div>
      ))}
    </div>
  );
};

export default MessagesList; 