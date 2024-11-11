import React from 'react';
import '../styles/Login.css'; 

const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-content">
        <form className="auth-form">
          <h1>Inicia Sesión</h1>
          <div className="input-wrapper">
            <i className="fas fa-user auth-icon"></i> {/* Icono de usuario */}
            <input type="text" placeholder="Nombre de usuario" className="auth-input" />
          </div>
          <div className="input-wrapper">
            <i className="fas fa-lock auth-icon"></i> {/* Icono de candado */}
            <input type="password" placeholder="Contraseña" className="auth-input" />
          </div>
          <button type="submit" className="auth-button">Iniciar Sesión</button>
          <a href="/register" className="auth-link">¿No tienes cuenta? Regístrate</a>
        </form>
      </div>
    </div>
  );
};

export default Login;






