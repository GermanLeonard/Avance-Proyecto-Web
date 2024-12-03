import { createContext } from "react"
export const AdminSedeContext = createContext()

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