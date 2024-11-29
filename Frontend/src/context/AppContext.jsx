import { createContext, useEffect, useState } from "react";
import {canchas} from '../assets/assets'
import axios from 'axios'
import {toast} from 'react-toastify'

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const moneda = '$'
    const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const value = {
        canchas, moneda, token, setToken, backendUrl //cuando las canchas sean dinamicas, se agrega getCanchasData
    }

    useEffect(() => {
        if(token){

        }else{
            
        }
    },[token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider