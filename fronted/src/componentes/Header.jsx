import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { me } from "../adapter/userAdapter";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await me();
        setUser(data);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
        // Aquí podrías redirigir al login si el token está vencido, por ejemplo
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (loading) return null; // o un spinner mientras carga el usuario

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white rounded-t-2xl shadow border-b border-gray-200">
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-xl shadow cursor-pointer"
          onClick={() => navigate("/hoters")}
        >
          <i className="pi pi-home" />
        </div>
        <span className="ml-2 text-gray-700 font-medium">
          Hola {user?.firstName || "Usuario"}
        </span>
      </div>

      <nav className="flex-1 flex justify-center gap-8">
        <button
          className="text-gray-700 font-medium hover:text-blue-500 transition"
          onClick={() => navigate("/hoters-favorites")}
        >
          Mis hoteles Favoritos
        </button>
        <button
          className="text-gray-700 font-medium hover:text-blue-500 transition"
          onClick={() => navigate("/perfil")}
        >
          Perfil
        </button>
        {user?.isAdmin && (
          <>
            <button
              className="text-gray-700 font-medium hover:text-blue-500 transition"
              onClick={() => navigate("/admin/users")}
            >
              Todos los usuarios
            </button>
            <button
              className="text-gray-700 font-medium hover:text-blue-500 transition"
              onClick={() => navigate("/admin/hotels")}
            >
              Gestionar hoteles
            </button>
          </>
        )}
      </nav>

      <button
        onClick={handleLogout}
        className="ml-4 px-3 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200 transition flex items-center gap-2"
      >
        <i className="pi pi-sign-out" /> Salir
      </button>
    </header>
  );
};

export default Header;
