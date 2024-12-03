import React, { useContext, useEffect, useState } from 'react';
import '../styles/Login.css';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });
      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  });

  return (
    <div className="login-container">
      <div className="login-content">
        <form className="login-form" onSubmit={handleLogin}>
          <h1>Inicia Sesión</h1>
          <div className="login-input-wrapper">
            <i className="fas fa-envelope login-icon"></i>
            <input
              type="email"
              placeholder="Correo electrónico"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login-input-wrapper">
            <i className="fas fa-lock login-icon"></i>
            <input
              type="password"
              placeholder="Contraseña"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Iniciar Sesión</button>
          <a href="/register" className="login-link">¿No tienes cuenta? Regístrate</a>
        </form>
      </div>
    </div>
  );
};

export default Login;








