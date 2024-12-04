import React, {useContext} from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminGeneralContext } from './context/AdminGeneralContext'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import EstadisticasGeneral from './pages/adminGeneral/EstadisticasGeneral'
import AgregarEmpleado from './pages/adminGeneral/AgregarEmpleado'
import AgregarCancha from './pages/adminGeneral/AgregarCancha'
import ListaTodasCanchas from './pages/adminGeneral/ListaTodasCanchas'
import './styles/Sidebar.css'
import EliminarReservas from './pages/adminGeneral/VerReservas'
import VerReservas from './pages/adminGeneral/VerReservas'


const App = () => {
  const {adminGeneralToken} = useContext(AdminGeneralContext)
  return adminGeneralToken ? (
    <div>
      <ToastContainer/>
      <div className='admin-page'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<></>}/>
          <Route path='/admin-reservas' element={<VerReservas/>}/>
          <Route path='/admin-estadisticas' element={<EstadisticasGeneral/>}/>
          <Route path='/admin-agregar-empleado' element={<AgregarEmpleado/>}/>
          <Route path='/admin-agregar-cancha' element={<AgregarCancha/>}/>
          <Route path='/admin-lista-canchas' element={<ListaTodasCanchas/>}/>
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login/>
      <ToastContainer/>
    </>
  )
}

export default App