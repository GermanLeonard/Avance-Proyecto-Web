import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { sucursal as lugar} from '../assets/assets'
import '../styles/Reserva.css'

function Reserva() {
  const navigate = useNavigate()
  const {sucursal} = useParams()
  const {canchas} = useContext(AppContext)

  const [filterCancha, setFilterCancha] = useState([])

  useEffect(() => {
    if(sucursal) {
      setFilterCancha(canchas.filter(cancha => cancha.lugar_id == sucursal))
    } else{
      setFilterCancha(canchas)
    }
  },[canchas, sucursal])

  console.log(sucursal + typeof(sucursal))
  console.log(filterCancha)
  return (
    <div className='reserva'>
      <p>Explora a través de nuestras sucursales</p>
      <div className='reserva-content'>
        <div className='reserva-filtro'>
          {lugar.map((item, index) => (
            <div key={index} onClick={() => sucursal == item.id ? navigate('/reserva') : navigate(`/reserva/${item.id}`)}>
              <p className={`${sucursal == item.id ? "active" : ""}`}>{item.lugar}</p>
            </div>
          ))}
        </div>
        <div className='canchas-card-container'>
          {
            filterCancha.map((item, index) => (
              <div onClick={() => navigate(`/reserva/${item.id}`)} key={index} className='canchas-card'>
                <img src={item.image} alt="" />
                <div>
                  <div>
                    <p>Disponible</p>
                  </div>
                  <p>{item.name}</p>
                  <p>{item.lugar}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Reserva