import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import '../styles/MisReservas.css'

const MisReservas = () => {
  const {canchas} = useContext(AppContext)
  return (
    <div className='mis-reservas'>
        <p>Mis Reservas</p>
        <div>
          {canchas.slice(0,2).map((item, index) => (
            <div key={index} className='reserva-card'>
              <div>
                <img src={item.image} alt="cancha" />
              </div>
              <div>
                <p>{item.name}</p>
                <p>{item.deporte}</p>
                <br />
                <p>Dirección:</p>
                <p>{item.direccion}</p>
                <br />
                <p><span>Fecha y Hora:</span> 24 de noviembre de 2024 | 15:30</p>
              </div>
              <div>
                <button>Pagar en linea</button>
                <button>Cancelar reserva</button>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default MisReservas