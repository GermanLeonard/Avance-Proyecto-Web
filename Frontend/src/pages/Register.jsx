import React from 'react';
import '../styles/Register.css'; 

const Register = () => {
  return (
    <div className="auth-container">
      <div className="auth-content">
        <form className="auth-form">
          <h1>Regístrate</h1>
          <div className="input-wrapper">
            <i className="fas fa-user auth-icon"></i> {/* Icono de usuario */}
            <input type="text" placeholder="Nombre de usuario" className="auth-input" />
          </div>
          <div className="input-wrapper">
            <i className="fas fa-envelope auth-icon"></i> {/* Icono de correo */}
            <input type="email" placeholder="Correo electrónico" className="auth-input" />
          </div>
          <div className="input-wrapper">
            <i className="fas fa-lock auth-icon"></i> {/* Icono de candado */}
            <input type="password" placeholder="Contraseña" className="auth-input" />
          </div>
          <p className="auth-text">Debe tener más de 6 caracteres</p>
          <button type="submit" className="auth-button">Regístrate</button>
          <a href="/login" className="auth-link">¿Ya tienes cuenta? Ingresa ahora</a>
        </form>
      </div>
    </div>
  );
};

export default Register;



