import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import '../styles/Cancha.css'

const Cancha = () => {
    const {canchaId} = useParams()
    const {canchas, moneda} = useContext(AppContext)
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']

    const [canchaInfo, setCanchaInfo] = useState(null)
    const [reservaFecha, setReservaFecha] = useState([])
    const [fechaIndex, setFechaIndex] = useState(0)
    const [reservaHora, setReservaHora] = useState('')

    const fetchCanchaInfo = async () => {
        const canchaInfo = canchas.find(cancha => cancha.id == canchaId)
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
                <div>
                    {
                        reservaFecha.length && reservaFecha.map((item, index) => (
                            <div className={`${fechaIndex == index ? 'active-day' : ''}`} key={index}>
                                <p>{item[0] && diasSemana[item[0].fecha.getDay()]}</p>
                                <p>{item[0] && item[0].fecha.getDate()}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Cancha