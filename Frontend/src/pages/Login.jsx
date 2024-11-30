import React, { useState } from 'react';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState(''); // Cambiado de username a email
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Cambiado de username a email
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Inicio de sesión exitoso:', data);
        alert('Inicio de sesión exitoso');
        // Guarda el token en localStorage si es necesario
        localStorage.setItem('token', data.token);
      } else {
        alert(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al iniciar sesión');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <form className="auth-form" onSubmit={handleLogin}>
          <h1>Inicia Sesión</h1>
          <div className="input-wrapper">
            <i className="fas fa-envelope auth-icon"></i> {/* Cambiado de usuario a correo */}
            <input
              type="email" // Cambiado de text a email
              placeholder="Correo electrónico"
              className="auth-input"
              value={email} // Cambiado de username a email
              onChange={(e) => setEmail(e.target.value)} // Cambiado de setUsername a setEmail
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
          <button type="submit" className="auth-button">Iniciar Sesión</button>
          <a href="/register" className="auth-link">¿No tienes cuenta? Regístrate</a>
        </form>
      </div>
    </div>
  );
};

export default Login;







