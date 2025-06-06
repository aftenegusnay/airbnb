import React, { useState } from 'react';
import Header from '../componentes/Header';
import { useMe } from '../hooks/useMe';
import { updateMe } from '../adapter/userAdapter';
import { Toast } from 'primereact/toast';

function parseJwt(token) {
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

const Profile = () => {
  const { user, loading, error } = useMe();
  const token = localStorage.getItem('token');
  const payload = parseJwt(token);
  const isAdmin = payload?.isAdmin;
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const toast = React.useRef(null);

  React.useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        birthDate: user.birthDate ? user.birthDate.slice(0, 10) : '',
      });
    }
  }, [user]);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSave = async e => {
    e.preventDefault();
    setSaving(true);
    setSaveError('');
    try {
      await updateMe(form);
      toast.current.show({ severity: 'success', summary: 'Perfil actualizado', life: 2000 });
      setEdit(false);
    } catch (err) {
      setSaveError('Error al actualizar el perfil');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-amber-100 p-2 sm:p-6">
      <div className="max-w-2xl mx-auto rounded-2xl border border-gray-200 overflow-hidden bg-white bg-opacity-60 shadow-xl">
        <Header username={user?.firstName || 'Usuario'} isAdmin={isAdmin} />
        <main className="flex flex-col items-center p-8">
          <Toast ref={toast} position="top-center" />
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Mi Perfil</h2>
          {loading && <div className="text-blue-500">Cargando perfil...</div>}
          {error && <div className="text-red-500">{error}</div>}
          {user && !edit && (
            <div className="w-full max-w-md bg-white rounded-xl shadow p-6 flex flex-col gap-4">
              <div><span className="font-semibold">Nombre:</span> {user.firstName} {user.lastName}</div>
              <div><span className="font-semibold">Email:</span> {user.email}</div>
              <div><span className="font-semibold">Fecha de nacimiento:</span> {user.birthDate && new Date(user.birthDate).toLocaleDateString()}</div>
              <div><span className="font-semibold">Rol:</span> {user.isAdmin ? 'Administrador' : 'Usuario'}</div>
              <div><span className="font-semibold">Creado:</span> {user.created && new Date(user.created).toLocaleDateString()}</div>
              <div><span className="font-semibold">Actualizado:</span> {user.updated && new Date(user.updated).toLocaleDateString()}</div>
              <button className="mt-4 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600" onClick={() => setEdit(true)}>
                Editar perfil
              </button>
            </div>
          )}
          {user && edit && (
            <form className="w-full max-w-md bg-white rounded-xl shadow p-6 flex flex-col gap-4" onSubmit={handleSave}>
              <div>
                <label className="font-semibold block mb-1">Nombre</label>
                <input name="firstName" value={form.firstName} onChange={handleChange} className="w-full border rounded px-2 py-1" required />
              </div>
              <div>
                <label className="font-semibold block mb-1">Apellido</label>
                <input name="lastName" value={form.lastName} onChange={handleChange} className="w-full border rounded px-2 py-1" required />
              </div>
              <div>
                <label className="font-semibold block mb-1">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full border rounded px-2 py-1" required />
              </div>
              <div>
                <label className="font-semibold block mb-1">Fecha de nacimiento</label>
                <input name="birthDate" type="date" value={form.birthDate} onChange={handleChange} className="w-full border rounded px-2 py-1" required />
              </div>
              {saveError && <div className="text-red-500">{saveError}</div>}
              <div className="flex gap-2 mt-2">
                <button type="submit" className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600" disabled={saving}>
                  {saving ? 'Guardando...' : 'Guardar'}
                </button>
                <button type="button" className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400" onClick={() => setEdit(false)} disabled={saving}>
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile; 