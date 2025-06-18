import React, { useEffect, useState, useRef } from 'react';
import Header from '../componentes/Header';
import { getAllUsers, toggleUserAdminStatus } from '../adapter/usersAdapter';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useRef(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      setError('Error al cargar los usuarios.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleAdmin = async (userId, currentIsAdmin) => {
    try {
      await toggleUserAdminStatus(userId);
      toast.current.show({ severity: 'success', summary: 'Éxito', detail: `Usuario ${currentIsAdmin ? 'degradado' : 'ascendido'} a ${currentIsAdmin ? 'usuario normal' : 'admin'}.`, life: 3000 });
      fetchUsers(); // Recargar usuarios para reflejar el cambio
    } catch (err) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error, por favor intenta de nuevo.', life: 3000 });
      console.error("Error al alternar estado de admin:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-amber-100 p-2 sm:p-6">
      <Toast ref={toast} position="top-center" />
      <div className="max-w-7xl mx-auto rounded-2xl border border-gray-200 overflow-hidden bg-white bg-opacity-60 shadow-xl">
        <Header />
        <main className="flex flex-col items-center p-4">
          <h2 className="text-xl font-semibold mb-6 mt-2 text-center text-gray-800">Gestión de Usuarios</h2>

          {loading && <div className="text-blue-500">Cargando usuarios...</div>}
          {error && <div className="text-red-500">{error}</div>}

          {!loading && !error && users.length === 0 && (
            <div className="text-gray-500 text-center py-8">
              <i className="pi pi-users text-4xl mb-2 block"></i>
              <p>No se encontraron usuarios.</p>
            </div>
          )}

          {!loading && !error && users.length > 0 && (
            <div className="overflow-x-auto w-full">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-blue-100 text-left text-gray-700 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Nombre</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-6 text-left">Admin</th>
                    <th className="py-3 px-6 text-left">Fecha de Nacimiento</th>
                    <th className="py-3 px-6 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">{user.firstName} {user.lastName}</td>
                      <td className="py-3 px-6 text-left">{user.email}</td>
                      <td className="py-3 px-6 text-left">{user.isAdmin ? 'Sí' : 'No'}</td>
                      <td className="py-3 px-6 text-left">{user.birthDate ? new Date(user.birthDate).toLocaleDateString() : 'N/A'}</td>
                      <td className="py-3 px-6 text-center">
                        <Button 
                          icon="pi pi-pencil" 
                          className="p-button-rounded p-button-success p-button-text" 
                          onClick={() => handleToggleAdmin(user.id, user.isAdmin)}
                          tooltip="Alternar estado de administrador"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UsersManagement; 