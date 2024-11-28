import React, { useContext, useEffect, useState } from 'react';
import '../styles/Login.css';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState(''); // Cambiado de username a email
  const [password, setPassword] = useState('');

  const {backendUrl, token, setToken} = useContext(AppContext)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const {data} = await axios.post(backendUrl + '/api/user/login', {email, password})
      console.log(data)
      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  })

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







