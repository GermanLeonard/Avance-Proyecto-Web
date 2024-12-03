import React, { useState } from "react";
import "../styles/EliminarReservas.css";

const EliminarReservas = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const data = Array.from({ length: 50 }, (_, index) => ({
    name: `Thomas dale ${index + 1}`,
    court: 1,
    sport: "Padel",
    location: "Los próceres",
    time: "8PM",
    price: "$50",
  }));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleDelete = (index) => {
    alert(`Eliminar reserva ${currentData[index].name}`);
    // Aquí puedes agregar la lógica para eliminar la reserva
  };

  return (
    <div className="eliminar-reservas-container">
      {/* Título */}
      <h1 className="title">ELIMINAR RESERVAS GLOBALES</h1>

      {/* Filtros */}
      <div className="filter-section">
        <select className="filter-input">
          <option value="">Sucursal</option>
          <option value="los proceres">Los próceres</option>
          <option value="sucursal 2">Sucursal 2</option>
        </select>
        <select className="filter-input">
          <option value="">Deporte</option>
          <option value="Padel">Padel</option>
          <option value="Futbol">Fútbol</option>
        </select>
        <button className="filter-button">BUSCAR</button>
      </div>

      {/* Tabla */}
      <div className="table-container">
        <div className="header-with-pagination">
          <p className="header-text">Reservas globales</p>
          <div className="pagination">
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
              &lt;
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={currentPage === index + 1 ? "active-page" : ""}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
              &gt;
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>N de cancha</th>
              <th>Deporte</th>
              <th>Sucursal</th>
              <th>Hora</th>
              <th>Precio</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.court}</td>
                <td>{item.sport}</td>
                <td>{item.location}</td>
                <td>{item.time}</td>
                <td>{item.price}</td>
                <td>
                  <i
                    className="fas fa-trash-alt delete-icon"
                    onClick={() => handleDelete(index)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EliminarReservas;




