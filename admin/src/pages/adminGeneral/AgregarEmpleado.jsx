import React, { useState, useContext } from "react";
import "../../styles/Agregar.css";
import { AdminGeneralContext } from "../../context/AdminGeneralContext";
import { toast } from "react-toastify";
import axios from "axios";

const AgregarEmpleado = () => {
  const { backendUrl, adminGeneralToken } = useContext(AdminGeneralContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sede, setSede] = useState("Antiguo Cuscatlán");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("sede", sede);

      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin-general/agregar-empleado",
        formData,
        { headers: { adminGeneralToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setUsername("");
        setEmail("");
        setPassword("");
        setSede("Antiguo Cuscatlán");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <form onSubmit={onSubmit} className="auth-form">
          <h2>Agregar Empleado</h2>
          <div className="input-wrapper">
            <i className="fas fa-user auth-icon"></i>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              placeholder="Usuario del empleado"
              required className="auth-input"
            />
          </div>
          <div className="input-wrapper">
            <i className="fas fa-envelope auth-icon"></i>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Correo electrónico"
              required className="auth-input"
            />
          </div>
          <div className="input-wrapper">
            <i className="fas fa-lock auth-icon"></i>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Contraseña"
              required className="auth-input"
            />
          </div>
          <div className="input-wrapper">
            <i className="fas fa-building auth-icon"></i>
            <select
              onChange={(e) => setSede(e.target.value)}
              value={sede}
              className="auth-input">
              <option value="Antiguo Cuscatlán">Antiguo Cuscatlán</option>
              <option value="Los Próceres">Los Próceres</option>
              <option value="El Platillo">El Platillo</option>
            </select>
          </div>
          <button className="auth-button">Agregar Empleado</button>
        </form>
      </div>
    </div>
  );
};

export default AgregarEmpleado;
