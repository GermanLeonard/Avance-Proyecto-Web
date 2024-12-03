import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false); //para el menu de responsive para celular

  const { token, setToken } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div onClick={() => navigate("/")} className="logo">
        <img src={assets.logo} alt="logo" />
        SPORT SPOT
      </div>
      <ul className="nav-links">
        <a href="/">
          <li>Inicio</li>
        </a>
        <a href="/#sedes">
          <li>Sedes</li>
        </a>
        <a href="">
          <li>Nosotros</li>
        </a>
        <a href="">
          <li>FAQ</li>
        </a>
        <a href="">
          <li>Contactanos</li>
        </a>
      </ul>
      <ul className="profile">
        {token ? (
          <div className="nav-profile">
            <img src={assets.userImg} alt="profile" />
            <img src={assets.dropdownIcon} alt="dropdown" />
            <div className="nav-dropdown-container">
              <div className="nav-dropdown">
                <p onClick={() => navigate("mis-reservas")}>Mis Reservas</p>
                <p onClick={logout}>Cerrar Sesión</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="auth-buttons">
            <li>
              <a href="/register" className="register-btn">
                Regístrate
              </a>
            </li>
            <li>
              <a href="/login" className="login-btn">
                Ingresa
              </a>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
