import React, { useState, useContext } from 'react'
import '../../styles/Agregar.css'
import { AdminGeneralContext } from '../../context/AdminGeneralContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AgregarEmpleado = () => {
  const {backendUrl, adminGeneralToken} = useContext(AdminGeneralContext)

  const[username, setUsername] = useState('')
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[sede, setSede] = useState('Antiguo Cuscatlán')

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('username', username)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('sede', sede)

      formData.forEach((value,key) =>{
        console.log(`${key} : ${value}`);
        
      })

      const {data} = await axios.post(backendUrl + '/api/admin-general/agregar-empleado', formData, {headers: {adminGeneralToken}})
      if(data.success){
        toast.success(data.message)
        setUsername('')
        setEmail('')
        setPassword('')
        setSede('Antiguo Cuscatlán')
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <p>
        Agregar Empleado
      </p>
      <div>
        <div className='formulario'>
          <div>
            <div>
              <p>Usuario del Empleado</p>
              <input onChange={(e)=>setUsername(e.target.value)} value={username} type="text" placeholder='Usuario' required/>
            </div>
            <div>
              <p>Email del Empleado</p>
              <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Email' required/>
            </div>
          </div>
          <div>
            <div>
              <p>Contraseña del Empleado</p>
              <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Contraseña' required/>
            </div>
            <div>
              <p>Sede del Empleado</p>
              <select onChange={(e)=>setSede(e.target.value)} value={sede} name="" id="">
                <option value="Antiguo Cuscatlán">Antiguo Cuscatlán</option>
                <option value="Los Próceres">Los Próceres</option>
                <option value="El Platillo">El Platillo</option>
              </select>
            </div>
          </div>
        </div>
        <button>Agregar Empleado</button>
      </div>
    </form>
  )
}

export default AgregarEmpleado