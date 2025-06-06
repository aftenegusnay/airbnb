import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Hoters from '../pages/Hoters';
import FavoriteHoters from '../pages/FavoriteHoters';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import Home from '../pages/Home';

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
        {/* Aquí puedes agregar más rutas según sea necesario */}
      </Routes>
    </Router>
  );
};

export default AppRoutes; 