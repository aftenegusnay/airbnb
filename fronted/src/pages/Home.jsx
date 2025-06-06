import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-amber-100 px-4">
      <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl px-8 py-12 w-full max-w-lg flex flex-col items-center border-t-8 border-blue-400 animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-4xl font-extrabold text-blue-500 tracking-tight drop-shadow">Flat</span>
          <span className="text-4xl font-extrabold text-amber-400 tracking-tight drop-shadow">Finder</span>
          <i className="pi pi-home text-blue-400 text-3xl ml-2" />
        </div>
        <h1 className="text-2xl font-bold text-blue-700 mb-2 text-center">¡Bienvenido a FlatFinder!</h1>
        <p className="text-gray-700 text-center mb-6">
          FlatFinder es la plataforma ideal para encontrar, comparar y gestionar alojamientos de manera fácil y rápida. Descubre pisos, casas y hoteles en todo el país, guarda tus favoritos y administra tu perfil de forma segura.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button
            className="w-full sm:w-auto px-6 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
            onClick={() => navigate('/login')}
          >
            Iniciar Sesión
          </button>
          <button
            className="w-full sm:w-auto px-6 py-2 rounded bg-amber-400 text-white font-semibold hover:bg-amber-500 transition"
            onClick={() => navigate('/register')}
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home; 