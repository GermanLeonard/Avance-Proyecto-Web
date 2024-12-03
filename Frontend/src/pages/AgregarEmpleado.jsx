import React, { useContext, useEffect, useState } from "react";
import "../styles/AgregarEmpleado.css"; 
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AgregarEmpleado = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sede, setSede] = useState(""); 

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        backendUrl + "/api/employee/register",
        { username, email, password, sede },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        toast.success("Empleado agregado exitosamente");
        navigate("/opciones"); // Redirige al menuu de opciones
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error al agregar empleado");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <form className="auth-form" onSubmit={handleRegister}>
          <h2>AGREGAR EMPLEADO</h2>
          <div className="input-wrapper">
            <i className="fas fa-user auth-icon"></i>
            <input
              type="text"
              placeholder="Nombre del empleado"
              className="auth-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <i className="fas fa-envelope auth-icon"></i>
            <input
              type="email"
              placeholder="Correo electrónico"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <i className="fas fa-lock auth-icon"></i>
            <input
              type="password"
              placeholder="Contraseña"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <i className="fas fa-building auth-icon"></i>
            <select
              className="auth-input"
              value={sede}
              onChange={(e) => setSede(e.target.value)}
              required
            >
              <option value="">Selecciona una sede</option>
              <option value="Sede 1">Sede 1</option>
              <option value="Sede 2">Sede 2</option>
              <option value="Sede 3">Sede 3</option>
            </select>
          </div>
          <button type="submit" className="auth-button">
            Agregar Empleado
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgregarEmpleado;
