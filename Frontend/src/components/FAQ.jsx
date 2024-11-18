import React, { useState } from 'react';
import '../styles/FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    { question: '¿Cómo puedo reservar una cancha?', answer: 'Puedes reservar una cancha desde nuestra página web en la sección de reservas.' },
    { question: '¿Cuáles son los métodos de pago aceptados?', answer: 'Aceptamos pagos con tarjetas de crédito, débito y transferencias bancarias.' },
    { question: '¿Puedo cancelar mi reserva?', answer: 'Sí, puedes cancelar tu reserva hasta 24 horas antes del evento.' },
    { question: '¿Hay descuentos para grupos grandes?', answer: 'Ofrecemos descuentos especiales para grupos de 10 o más personas.' },
  ];

  return (
    <div className="faq-container">
      <div className="faq-header">FAQ</div>
      <div className="faq-questions">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className={`faq-question ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
            </div>
            {activeIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
