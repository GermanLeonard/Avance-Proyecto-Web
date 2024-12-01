import React, { useContext, useState } from 'react'
import '../../styles/Agregar.css'
import { sucursal } from '../../assets/assets'
import { AdminGeneralContext } from '../../context/AdminGeneralContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AgregarCancha = () => {
  const {backendUrl, adminGeneralToken} = useContext(AdminGeneralContext)

  const initialSucursal = sucursal.find((sede) => sede.lugar === 'Antiguo Cuscatlán') || {};


  const[name, setName] = useState('')
  const[lugar, setLugar] = useState('Antiguo Cuscatlán')
  const[deporte, setDeporte] = useState('Futbol')
  const[descripcion, setDescripcion] = useState('')
  const[capacidad, setCapacidad] = useState('')
  const[precioHora, setPrecioHora] = useState('')
  const [lugar_id, setLugar_id] = useState(initialSucursal.id || '');
  const [direccion, setDireccion] = useState(initialSucursal.direccion || '');

  // Manejar cambio de sede y actualizar lugar_id y direccion
  const handleLugarChange = (selectedLugar) => {
    setLugar(selectedLugar);

    // Buscar la sucursal correspondiente
    const selectedSucursal = sucursal.find((sede) => sede.lugar === selectedLugar);
    console.log('Sucursal seleccionada:', selectedSucursal);

    if (selectedSucursal) {
      setLugar_id(selectedSucursal.id);
      setDireccion(selectedSucursal.direccion);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('lugar', lugar)
      formData.append('lugar_id', lugar_id)
      formData.append('direccion', direccion)
      formData.append('deporte', deporte)
      formData.append('descripcion', descripcion)
      formData.append('capacidad', Number(capacidad))
      formData.append('precioHora', Number(precioHora))

      formData.forEach((value,key) =>{
        console.log(`${key} : ${value}`);
        
      })

      const {data} = await axios.post(backendUrl + '/api/admin-general/agregar-cancha', formData, {headers: {adminGeneralToken}})
      if(data.success){
        toast.success(data.message)
        setName('')
        setLugar('Antiguo Cuscatlán')
        setLugar_id(initialSucursal.id || '')
        setDireccion(initialSucursal.direccion || '')
        setDeporte('Futbol')
        setDescripcion('')
        setCapacidad('')
        setPrecioHora('')
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <p>
        Agregar Cancha
      </p>
      <div>
        <div className='formulario'>
          <div>
            <div>
              <p>Nombre de la Cancha</p>
              <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Nombre' required/>
            </div>
            <div>
              <p>Sede de la Cancha</p>
              <select onChange={(e)=>handleLugarChange(e.target.value)} value={lugar} name="" id="">
                <option value="Antiguo Cuscatlán">Antiguo Cuscatlán</option>
                <option value="Los Próceres">Los Próceres</option>
                <option value="El Platillo">El Platillo</option>
              </select>
            </div>
            <div>
              <p>Deporte de la Cancha</p>
              <select onChange={(e)=>setDeporte(e.target.value)} value={deporte} name="" id="">
                <option value="Futbol">Futbol</option>
                <option value="Basketball">Basketball</option>
                <option value="Padel">Padel</option>
              </select>
            </div>
          </div>
          <div>
            <div>
              <p>Descripcion de la Cancha</p>
              <textarea onChange={(e)=>setDescripcion(e.target.value)} value={descripcion} placeholder='Descripción' required/>
            </div>
            <div>
              <p>Capacidad de la Cancha</p>
              <input onChange={(e)=>setCapacidad(e.target.value)} value={capacidad} type="text" placeholder='Capacidad' required/>
            </div>
            <div>
              <p>Precio por Hora de la Cancha</p>
              <input onChange={(e)=>setPrecioHora(e.target.value)} value={precioHora} type="number" placeholder='Precio' required/>
            </div>
          </div>
        </div>
        <button type='submit'>Agregar Cancha</button>
      </div>
    </form>
  )
}

export default AgregarCancha