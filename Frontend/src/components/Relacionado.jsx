import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { sucursal as lugar, deporte } from "../assets/assets";
import "../styles/Reserva.css";
import { assets } from "../assets/assets";

function Reserva() {
  const navigate = useNavigate();
  const { sucursal } = useParams();
  const { canchas } = useContext(AppContext);

  const [filterCancha, setFilterCancha] = useState([]);
  const [selectedDeporte, setSelectedDeporte] = useState("");
  const [selectedSucursal, setSelectedSucursal] = useState(sucursal || "");

  useEffect(() => {
    let filtrado = canchas;
    if (selectedSucursal) {
      filtrado = filtrado.filter(
        (cancha) => cancha.lugar_id == selectedSucursal
      );
    }
    if (selectedDeporte) {
      filtrado = filtrado.filter((cancha) => cancha.deporte == selectedDeporte);
    }
    setFilterCancha(filtrado);
  }, [canchas, selectedSucursal, selectedDeporte]);

  return (
    <div className="reserva">
      <p>Reserva de Instalaciones Deportivas</p>
      <div className="reserva-content">
        <div className="reserva-filtro">
          <select
            value={selectedSucursal}
            onChange={(e) => {
              setSelectedSucursal(e.target.value);
              navigate(
                e.target.value ? `/reserva/${e.target.value}` : "/reserva"
              );
            }}
          >
            <option value="">Todas las sucursales</option>
            {lugar.map((item) => (
              <option key={item.id} value={item.id}>
                {item.lugar}
              </option>
            ))}
          </select>
          <select
            value={selectedDeporte}
            onChange={(e) => setSelectedDeporte(e.target.value)}
          >
            <option value="">Todos los deportes</option>
            {Object.keys(deporte).map((key) => (
              <option key={key} value={deporte[key]}>
                {deporte[key]}
              </option>
            ))}
          </select>
        </div>
        <div className="canchas-card-container">
          {filterCancha.map((item) => (
            <div
              onClick={() => navigate(`/cancha/${item.id}`)}
              key={item.id}
              className="canchas-card"
            >
              <img
                src={item.image}
                alt={item.name}
                className="canchas-card-img"
              />
              <div className="canchas-card-info">
                <div>
                  <p>
                    <strong>{item.name}</strong>
                  </p>
                  <p>{item.lugar}</p>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  <div className="cancha-estado">
                    <img src={assets.disponible} alt="Disponible" />
                    Disponible
                  </div>
                  <button>RESERVA</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reserva;