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
    <div className="opciones-container reservas-page">
        <aside className="sidebar">
          <div className="logo-container">
            <img src={assets.logo} alt="Sport Spot Logo" className="logo" />
            <h2>SPORT SPOT</h2>
          </div>
          <p>Administrador General</p>
            {
              (adminGeneralToken /*|| adminSedeToken*/) && <nav className='menu'>
                <NavLink to={'/admin-reservas'} className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
                  <i className="fas fa-eye"></i>
                  <span>Ver Reservas</span>
                </NavLink>
                <NavLink to={'/admin-estadisticas'} className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
                  <i className="fas fa-chart-bar"></i>
                  <span>Ver Estadísticas</span>
                </NavLink>
                <NavLink to={'/admin-lista-canchas'} className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
                  <i className="fas fa-futbol"></i>
                  <span>Ver Canchas</span>
                </NavLink>
                {adminGeneralToken && (
                  <>
                    <NavLink to={'/admin-agregar-cancha'} className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
                      <img src="" alt="imagen" />
                      <span>Agregar Cancha</span>
                    </NavLink>
                  </>
                  )
                }
              </nav>
            }
            <button className="back-button" onClick={logout}>
              <i className="fas fa-arrow-left"></i> Regresar
            </button>
        </aside>
    </div>
  )
}

export default Sidebar