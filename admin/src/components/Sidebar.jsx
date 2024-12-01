import React, {useContext} from 'react'
import { assets } from '../assets/assets'
import { AdminGeneralContext } from '../context/AdminGeneralContext'
import '../styles/Sidebar.css'
import {NavLink, useNavigate} from 'react-router-dom'

const Sidebar = () => {
    const {adminGeneralToken, setAdminGeneralToken} = useContext(AdminGeneralContext)
    const navigate = useNavigate()
    const logout = () => {
        navigate('/')
        adminGeneralToken && setAdminGeneralToken('')
        adminGeneralToken && localStorage.removeItem('adminGeneralToken')
    }
  return (
    <div className='sidebar'>
        <div>
          <div>
            <img src={assets.logo} alt="" />
            <p>SPORT SPOT</p>
          </div>
            <p>{adminGeneralToken ? 'Administrador General' : 'Administrador de Sede'}</p>
            {
              adminGeneralToken && <ul>
                <NavLink to={'/admin-general-dashboard'} className={({ isActive }) => (isActive ? 'navlink-selected' : 'navlink')}>
                  <img src="" alt="imagen" />
                  <p>Inicio</p>
                </NavLink>
                <NavLink to={'/admin-general-reservas'} className={({ isActive }) => (isActive ? 'navlink-selected' : 'navlink')}>
                  <img src="" alt="imagen" />
                  <p>Ver Reservas</p>
                </NavLink>
                <NavLink to={'/admin-general-estadisticas'} className={({ isActive }) => (isActive ? 'navlink-selected' : 'navlink')}>
                  <img src="" alt="imagen" />
                  <p>Ver Estadísticas</p>
                </NavLink>
                <NavLink to={'/admin-general-agregar-empleado'} className={({ isActive }) => (isActive ? 'navlink-selected' : 'navlink')}>
                  <img src="" alt="imagen" />
                  <p>Agregar Empleado</p>
                </NavLink>
                <NavLink to={'/admin-general-agregar-cancha'} className={({ isActive }) => (isActive ? 'navlink-selected' : 'navlink')}>
                  <img src="" alt="imagen" />
                  <p>Agregar Cancha</p>
                </NavLink>
                <NavLink to={'/admin-general-lista-canchas'} className={({ isActive }) => (isActive ? 'navlink-selected' : 'navlink')}>
                  <img src="" alt="imagen" />
                  <p>Ver Canchas</p>
                </NavLink>
              </ul>
            }
            <button onClick={logout}>Regresar</button>
        </div>
    </div>
  )
}

export default Sidebar