import { createContext } from "react";
import {canchas} from '../assets/assets'

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const moneda = '$'
    const value = {
        canchas, moneda
    }
    
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider