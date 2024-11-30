import { createContext, useState } from "react"
export const AdminGeneralContext = createContext()

const AdminGeneralContextProvider = (props) => {
    const [adminGeneralToken, setAdminGeneralToken] = useState(localStorage.getItem('adminGeneralToken')?localStorage.getItem('adminGeneralToken'):'')
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const value = {
        adminGeneralToken, setAdminGeneralToken, backendUrl
    }

    return (
        <AdminGeneralContext.Provider value={value}>
            {props.children}
        </AdminGeneralContext.Provider>
    )
}

export default AdminGeneralContextProvider