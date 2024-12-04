import { createContext } from "react"
export const AdminSedeContext = createContext()
import axios from 'axios'
import {toast} from 'react-toastify'

const AdminSedeContextProvider = (props) => {
    
    const value = {

    }

    return (
        <AdminSedeContext.Provider value={value}>
            {props.children}
        </AdminSedeContext.Provider>
    )
}

export default AdminSedeContextProvider