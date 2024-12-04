import { createContext } from "react"
export const AdminSedeContext = createContext()
import axios from 'axios'
import {toast} from 'react-toastify'
import { useState } from "react"

const AdminSedeContextProvider = (props) => {
    const [adminSedeToken, setAdminSedeToken] = useState(localStorage.getItem('adminSedeToken')?localStorage.getItem('adminSedeToken'):'')
    const [canchas, setCanchas] = useState([])
    const [reservas, setReservas] = useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const value = {
        adminSedeToken, setAdminSedeToken, canchas, setCanchas, reservas, setReservas, backendUrl
    }

    return (
        <AdminSedeContext.Provider value={value}>
            {props.children}
        </AdminSedeContext.Provider>
    )
}

export default AdminSedeContextProvider