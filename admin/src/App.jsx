import React, {useContext} from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminGeneralContext } from './context/AdminGeneralContext'
import Sidebar from './components/Sidebar'

const App = () => {
  const {adminGeneralToken} = useContext(AdminGeneralContext)
  return adminGeneralToken ? (
    <div>
      <ToastContainer/>
      <div>
        <Sidebar/>
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