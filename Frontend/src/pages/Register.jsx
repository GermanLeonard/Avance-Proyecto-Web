import React, { useContext, useEffect, useState } from 'react';
import '../styles/Register.css'; 
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(backendUrl + '/api/user/register', {
        username,
        email,
        password,
      });
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
    <div className="register-container">
      <div className="register-content">
        <form className="register-form" onSubmit={handleRegister}>
          <h1>Regístrate</h1>
          <div className="register-input-wrapper">
            <i className="fas fa-user register-icon"></i>
            <input
              type="text"
              placeholder="Nombre de usuario"
              className="register-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="register-input-wrapper">
            <i className="fas fa-envelope register-icon"></i>
            <input
              type="email"
              placeholder="Correo electrónico"
              className="register-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="register-input-wrapper">
            <i className="fas fa-lock register-icon"></i>
            <input
              type="password"
              placeholder="Contraseña"
              className="register-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <p className="register-text">Debe tener más de 6 caracteres</p>
          <button type="submit" className="register-button">
            Regístrate
          </button>
          <a href="/login" className="register-link">
            ¿Ya tienes cuenta? Ingresa ahora
          </a>
        </form>
      </div>
    </div>
  );
};

export default Register;




