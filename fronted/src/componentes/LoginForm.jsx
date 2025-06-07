import React, { useState, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin } = useAuth();
  const toast = useRef(null);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await handleLogin(email, password);
      toast.current.show({
        severity: 'success',
        summary: '¡Bienvenido!',
        detail: 'Inicio de sesión exitoso',
        life: 2000,
      });
      if (token) {
        setTimeout(() => {
          navigate('/hoters');
        }, 1200);
      }
    } catch (err) {
      let detail = 'Credenciales inválidas';
      if (err?.response?.data?.message) {
        detail = err.response.data.message;
      }
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail,
        life: 3000,
      });
    }
  };

  return (
    <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl px-4 py-8 sm:px-8 sm:py-12 w-full max-w-md flex flex-col items-center border-t-8 border-blue-400 animate-fade-in mx-2">
      <Toast ref={toast} position="top-center" />
      {/* Branding FlatFinder */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-3xl sm:text-4xl font-extrabold text-blue-500 tracking-tight drop-shadow">Flat</span>
          <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-tight drop-shadow">Finder</span>
          <i className="pi pi-home text-blue-400 text-2xl sm:text-3xl ml-2" />
        </div>
        <span className="text-sm sm:text-base text-gray-500 font-light text-center">Tu lugar ideal, fácil de encontrar</span>
      </div>
      <form onSubmit={onSubmit} className="w-full flex flex-col gap-6">
        <span className="p-input-icon-left w-full">
          <i className="pi pi-user" />
          <InputText
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="w-full p-inputtext-lg rounded-xl focus:ring-2 focus:ring-blue-400 border border-gray-300"
            required
          />
        </span>
        <span className="p-input-icon-left w-full">
          <i className="pi pi-lock" />
          <Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full p-inputtext-lg rounded-xl focus:ring-2 focus:ring-blue-400 border border-gray-300"
            feedback={false}
            toggleMask
            required
          />
        </span>
        <Button
          icon="pi pi-arrow-right"
          className="p-button-rounded p-button-lg w-full mt-2 bg-gradient-to-r from-blue-500 to-indigo-600 border-0 text-white shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out"
          type="submit"
          label="Iniciar Sesión"
        />
      </form>
      {/* Enlaces adicionales */}
      <div className="flex flex-col items-center gap-4 mt-8 w-full">
        <button
          type="button"
          className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out text-sm font-semibold"
          onClick={() => navigate('/register')}
        >
          ¿No tienes una cuenta? Regístrate aquí
        </button>
        {/* Puedes añadir más enlaces aquí, por ejemplo, para recuperar contraseña */}
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700 transition duration-200 ease-in-out text-sm"
          onClick={() => alert('Funcionalidad de ayuda no implementada')}
        >
          ¿Necesitas ayuda?
        </button>
      </div>
    </div>
  );
};

export default LoginForm; 