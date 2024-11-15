import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { sucursal as lugar} from '../assets/assets'

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
    <div>
      <p>Explora a través de nuestras sucursales</p>
      <div>
        {lugar.map((item, index) => (
          <div key={index}>
            <p>{item.lugar}</p>
          </div>
        ))}
        <div>
          {
            filterCancha.map((item, index) => (
              <div onClick={() => navigate(`/reserva/${item.id}`)} key={index}>
                <img src="" alt="" />
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