import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Hoters from '../pages/Hoters';
import FavoriteHoters from '../pages/FavoriteHoters';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import Home from '../pages/Home';
import UsersManagement from '../pages/UsersManagement';
import HotelsManagement from '../pages/HotelsManagement';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hoters" element={<Hoters />} />
        <Route path="/hoters-favorites" element={<FavoriteHoters />} />
        <Route path="/perfil" element={<Profile />} />
        {/* Ruta para la gestión de usuarios */}
        <Route path="/admin/users" element={<UsersManagement />} />
        {/* Nueva ruta para la gestión de hoteles */}
        <Route path="/admin/hotels" element={<HotelsManagement />} />
        {/* Aquí puedes agregar más rutas según sea necesario */}
      </Routes>
    </Router>
  );
};

export default AppRoutes; 