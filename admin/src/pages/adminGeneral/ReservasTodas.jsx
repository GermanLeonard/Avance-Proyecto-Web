import React, { useState } from "react";
import "../../styles/VerReservas.css";

const ReservasTodas = () => {
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

  return (
    <div className="reservas-container">
      <h1>RESERVAS GLOBALES</h1>
      <div className="search-section">
        <select className="search-input">
          <option value="Los próceres">Sucursal</option>
        </select>
        <select className="search-input">
          <option value="Padel">Deporte</option>
        </select>
        <button className="search-button">BUSCAR</button>
      </div>
      <div className="table-container">
        <div className="table-header">
          <div className="header-text">Reservas Globales</div>
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
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
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservasTodas;