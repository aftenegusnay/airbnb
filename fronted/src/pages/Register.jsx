import React, { useState, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { handleRegister } = useAuth();
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    birthDate: '',
  });
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleRegister(form);
      toast.current.show({ severity: 'success', summary: 'Registro exitoso', detail: '¡Bienvenido!', life: 2000 });
      setTimeout(() => navigate('/hoters'), 1200);
    } catch (err) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error, por favor intenta de nuevo.', life: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-amber-100">
      <Toast ref={toast} position="top-center" />
      <form onSubmit={handleSubmit} className="bg-white bg-opacity-90 rounded-3xl shadow-2xl px-6 py-10 w-full max-w-md flex flex-col gap-4 border-t-8 border-blue-400 animate-fade-in mx-2">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Crear cuenta</h2>
        <input name="firstName" value={form.firstName} onChange={handleChange} className="w-full border rounded px-2 py-2" placeholder="Nombre" required />
        <input name="lastName" value={form.lastName} onChange={handleChange} className="w-full border rounded px-2 py-2" placeholder="Apellido" required />
        <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full border rounded px-2 py-2" placeholder="Correo electrónico" required />
        <input name="password" type="password" value={form.password} onChange={handleChange} className="w-full border rounded px-2 py-2" placeholder="Contraseña" required />
        <input name="birthDate" type="date" value={form.birthDate} onChange={handleChange} className="w-full border rounded px-2 py-2" required />
        <button type="submit" className="mt-2 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
        <div className="text-center mt-2">
          ¿Ya tienes cuenta? <a href="/login" className="text-blue-500 hover:underline">Inicia sesión</a>
        </div>
      </form>
    </div>
  );
};

export default Register; 