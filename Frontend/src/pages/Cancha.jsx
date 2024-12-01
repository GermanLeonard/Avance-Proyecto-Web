import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import '../styles/Cancha.css'
import Relacionado from '../components/Relacionado'
import { toast } from 'react-toastify'
import axios from 'axios'

const Cancha = () => {
    const navigate = useNavigate()
    const {canchaId} = useParams()
    const {canchas, moneda, backendUrl, token, getCanchasData} = useContext(AppContext)
    const diasSemana = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB']

    const [canchaInfo, setCanchaInfo] = useState(null)
    const [reservaFecha, setReservaFecha] = useState([])
    const [fechaIndex, setFechaIndex] = useState(0)
    const [reservaHora, setReservaHora] = useState('')

    const fetchCanchaInfo = async () => {
        const canchaInfo = canchas.find(cancha => cancha._id == canchaId)
        setCanchaInfo(canchaInfo)
    }

    const horariosDisponibles = async () => {
        setReservaFecha([])
        let ahora = new Date()

        for(let i = 0; i < 7; i++){
            //obteniendo fecha con el indice
            let fechaActual = new Date(ahora)
            fechaActual.setDate(ahora.getDate() + i)
            //poniendo la hora final de la fecha con su indice
            let horaFin = new Date()
            horaFin.setDate(ahora.getDate() + i)
            horaFin.setHours(22,0,0,0)
            //si ya pasó la hora final del día actual, omitir ese día
            if (i === 0 && ahora.getHours() >= 21) {
                continue
            }
            //poniendo horas
            if(ahora.getDate() === fechaActual.getDate()){
                fechaActual.setHours(fechaActual.getHours() > 8 ? fechaActual.getHours() + 1 : 8)
                fechaActual.setMinutes(0)
                //fechaActual.setMinutes(fechaActual.getMinutes() > 30 ? 30 : 0)
            }else{
                fechaActual.setHours(8)
                fechaActual.setMinutes(0)
            }
            let horasDisponibles = []
            while(fechaActual < horaFin){
                let formatoTiempo = fechaActual.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
                // agregar hora al array de horasDisponibles
                horasDisponibles.push({
                    fecha: new Date(fechaActual),
                    hora: formatoTiempo
                })
                //Incrementar cada espacio por 1 hora
                fechaActual.setHours(fechaActual.getHours() + 1)
            }
            setReservaFecha(prev => ([...prev, horasDisponibles]))
        }
    }
    const reservarCancha = async () => {
        if(!token){
            toast.warn('Inicia Sesión Para Reservar Canchas')
            return navigate('/login')
        } try {
            const date = reservaFecha[fechaIndex][0].fecha
            let dia = date.getDate()
            let mes = date.getMonth() + 1
            let anio = date.getFullYear()
            const espacioFecha = dia + '_' + mes + '_' + anio
            console.log('Datos enviados:', { canchaId, espacioFecha, reservaHora });
            const {data} = await axios.post(backendUrl + '/api/user/reservar-cancha', {canchaId, espacioFecha, reservaHora}, {headers:{token}})
            if(data.success){
                toast.success(data.message)
                getCanchasData()
                navigate('/mis-reservas')
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchCanchaInfo()
    },[canchas, canchaId])

    useEffect(() => {
        horariosDisponibles()
    },[canchaInfo])

    useEffect(() => {
        console.log(reservaFecha);
    },[reservaFecha])

    return canchaInfo && (
        <div className='cancha'>
            <div className='cancha-card'>
                <div>
                    <img src={canchaInfo.image} alt="" className='cancha-card-image'/>
                </div>
                <div className='cancha-info'>
                    <p>{canchaInfo.name}</p>
                    <div>
                        <p>{canchaInfo.lugar}</p>
                        <button>{canchaInfo.deporte}</button>
                    </div>
                
                    <div className='cancha-descripcion'>
                        <p>{canchaInfo.descripcion}</p>
                        <p>Precio por hora: <span>{moneda}{canchaInfo.precioHora}</span></p>
                    </div>
                </div>
            </div>
            <div className='opciones-reserva'>
                <p>Horarios de Reserva</p>
                <div className='dia-reserva'>
                    {
                        reservaFecha.length && reservaFecha.map((item, index) => (
                            <div onClick={() => {
                                setFechaIndex(index)
                                setReservaHora('')
                            }} className={`${fechaIndex == index ? 'active-day' : ''}`} key={index}>
                                <p>{item[0] && diasSemana[item[0].fecha.getDay()]}</p>
                                <p>{item[0] && item[0].fecha.getDate()}</p>
                            </div>
                        ))
                    }
                </div>
                <div className='hora-reserva'>
                    {reservaFecha.length && reservaFecha[fechaIndex].map((item, index) => (
                        <p key={index} onClick={() => setReservaHora(item.hora)} className={`${item.hora == reservaHora ? 'active-day' : ''}`}>
                            {item.hora.toLowerCase()}
                        </p>
                        ))
                    }
                </div>
                <button onClick={() => {reservarCancha()}}>Reservar Cancha</button>
            </div>
            <Relacionado canchaId={canchaId} deporte={canchaInfo.deporte}/>
        </div>
    )
}

export default Cancha