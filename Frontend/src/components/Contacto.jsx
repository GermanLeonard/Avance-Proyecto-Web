import React, { useState } from 'react';
import '../styles/Contacto.css';

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-header">Contáctanos</div>
      <div className="contact-wrapper">
        <div className="info-section">
          <div className="decoration-circle-1"></div>
          <div className="decoration-circle-2"></div>
          <div className="info-content">
            <h2>Danos un toque para más información</h2>
            <p>
              Regístrate y disfruta de todas las ventajas que te ofrecemos,
              introduce tus datos y nos pondremos en contacto contigo.
            </p>
          </div>
        </div>

        <div className="form-section">
          <form 
            action="https://formsubmit.co/sportspotsv@gmail.com" 
            method="POST"
          >
            {/* Atributos necesarios para Formsubmit */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="https://localhost:5173" />

            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo electrónico"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Teléfono"
                required
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Mensaje"
                rows="4"
                required
              />
            </div>

            <button type="submit">
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
