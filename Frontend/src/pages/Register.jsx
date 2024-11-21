import React, { useState } from 'react';
import '../styles/Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Usuario registrado exitosamente:', data);
        alert('Registro exitoso');
      } else {
        alert(data.message || 'Error al registrarse');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al registrarse');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <form className="auth-form" onSubmit={handleRegister}>
          <h1>Regístrate</h1>
          <div className="input-wrapper">
            <i className="fas fa-user auth-icon"></i>
            <input
              type="text"
              placeholder="Nombre de usuario"
              className="auth-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            />
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




