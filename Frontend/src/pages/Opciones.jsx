import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../styles/Opciones.css";
import logo from "../assets/imagenes/logo.png";

const Opciones = () => {
  const navigate = useNavigate();

  return (
    <div className="opciones-container reservas-page">
      <aside className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Sport Spot Logo" className="logo" />
          <h2>SPORT SPOT</h2>
        </div>
        <nav className="menu">
          <div className="menu-item" onClick={() => navigate("/opciones/ver-reservas")}>
            <i className="fas fa-eye"></i>
            <span>Ver reservas</span>
          </div>
          <div className="menu-item" onClick={() => navigate("/opciones/eliminar-reservas")}>
            <i className="fas fa-trash-alt"></i>
            <span>Eliminar reservas</span>
          </div>
          <div className="menu-item" onClick={() => alert("En construcción")}>
            <i className="fas fa-chart-bar"></i>
            <span>Ver estadísticas</span>
          </div>
          <div className="menu-item" onClick={() => navigate("/opciones/agregar-empleado")}>
            <i className="fas fa-user-plus"></i>
            <span>Agregar empleado</span>
          </div>
          <div className="menu-item" onClick={() => alert("En construcción")}>
            <i className="fas fa-user-times"></i>
            <span>Eliminar cuenta</span>
          </div>
        </nav>
        <button className="back-button" onClick={() => navigate("/")}>
          <i className="fas fa-arrow-left"></i> Regresar
        </button>
      </aside>
      <main className="main-content">
        <Outlet /> {/* Aquí se renderizan las vistas hijas */}
      </main>
    </div>
  );
};

export default Opciones;




