import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
import bkbImage from '../imagenes/bkb.png';
import futbolImage from '../imagenes/futbol.png';
import padelImage from '../imagenes/padel.png';

const Header = () => {
  const images = [bkbImage, futbolImage, padelImage];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">SPORT SPOT</div>
        <ul className="nav-links">
          <li><a href="/">Inicio</a></li>
          <li><a href="/">sedes</a></li>
          <li><a href="/">Nosotros</a></li>
          <li><a href="/">FAQ</a></li>
          <li><a href="/">Contactanos</a></li>
          <li><a href="/register" className="register-btn">Regístrate</a></li>
          <li><a href="/login" className="login-btn">Ingresa</a></li>
        </ul>
      </nav>
      <div className="slider">
        <button className="arrow left-arrow" onClick={handlePrevious}>
          &#9664;
        </button>
        <img src={images[currentIndex]} alt="Deportes" className="slider-image" />
        <button className="arrow right-arrow" onClick={handleNext}>
          &#9654;
        </button>
        <div className="slide-text">
          <h1>CONQUISTA TU POTENCIAL</h1>
          <p>Descubre todas las opciones que tenemos disponibles para ti dentro de nuestras sedes deportivas.</p>
          <button className="reserve-btn">RESERVA</button>
        </div>
      </div>
    </header>
  );
};

export default Header;


