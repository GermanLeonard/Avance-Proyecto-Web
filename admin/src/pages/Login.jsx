import React, {useState, useContext} from 'react'
import '../styles/Login.css'
import { AdminGeneralContext } from '../context/AdminGeneralContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AdminSedeContext } from '../context/AdminSedeContext'

const Login = () => {
    const [state, setState] = useState('Administrador de Sede')
    const {setAdminGeneralToken, backendUrl} = useContext(AdminGeneralContext)
    const {setAdminSedeToken} = useContext(AdminSedeContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            if(state == 'Administrador General'){
                const {data} = await axios.post(backendUrl + '/api/admin-general/login', {email, password})
                if (data.success) {
                    localStorage.setItem('adminGeneralToken', data.token)
                    setAdminGeneralToken(data.token);
                } else{
                    toast.error(data.message)
                }
            } else{
                const {data} = await axios.post(backendUrl + '/api/admin-sede/login', {email, password})
                if (data.success) {
                    localStorage.setItem('adminSedeToken', data.token)
                    setAdminSedeToken(data.token);
                } else{
                    toast.error(data.message)
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <form onSubmit={handleLogin}>
        <div>
            <p><span>{state} </span> Login</p>
            <div>
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" required/>
            </div>
            <div>
                <p>Contraseña</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" required/>
            </div>
            <button>Login</button>
            {
                state == 'Administrador de Sede'
                ? <p onClick={() => setState('Administrador General')}> Eres Administrador General? Haz click aqui</p>
                : <p onClick={() => setState('Administrador de Sede')}>Eres Administrador de Sede? Haz click aqui</p>
            }
        </div>
    </form>
  )
}

export default Login