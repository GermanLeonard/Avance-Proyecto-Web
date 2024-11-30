import React, {useContext} from 'react'
import { assets } from '../assets/assets'
import { AdminGeneralContext } from '../context/AdminGeneralContext'
import '../styles/Navbar.css'
import {useNavigate} from 'react-router-dom'

const Sidebar = () => {
    const {adminGeneralToken, setAdminGeneralToken} = useContext(AdminGeneralContext)
    const navigate = useNavigate()
    const logout = () => {
        navigate('/')
        adminGeneralToken && setAdminGeneralToken('')
        adminGeneralToken && localStorage.removeItem('adminGeneralToken')
    }
  return (
    <div>
        <div>
          <div>
            <img src={assets.logo} alt="" />
            <p>SPORT SPOT</p>
          </div>
            <p>{adminGeneralToken ? 'Administrador General' : 'Administrador de Sede'}</p>
        </div>
        <button onClick={logout}>Regresar</button>
    </div>
  )
}

export default Sidebar