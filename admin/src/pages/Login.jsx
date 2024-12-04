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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


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
      } else {
        toast.warn('Funcionalidad para Administrador de Sede aún no implementada.');
      }
    } catch (error) {
      toast.error('Error al iniciar sesión.');
    }
  };

  return (
    <div className="custom-auth-container">
      <div className="custom-auth-content">
        <form className="custom-auth-form" onSubmit={handleLogin}>
          <h1>{state} Login</h1>
          <div className="custom-input-wrapper">
            <i className="custom-auth-icon fas fa-envelope"></i>
            <input
              className="custom-auth-input"
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="custom-input-wrapper">
            <i className="custom-auth-icon fas fa-lock"></i>
            <input
              className="custom-auth-input"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="custom-auth-button">Login</button>
          <div className="custom-auth-link">
            {state === 'Administrador General' ? (
              <p onClick={() => setState('Administrador de Sede')}>¿Eres Administrador de Sede? Haz click aquí</p>
            ) : (
              <p onClick={() => setState('Administrador General')}>¿Eres Administrador General? Haz click aquí</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;


