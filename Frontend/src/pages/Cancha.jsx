{/* esto no sirve no lo arregle xd  */}

import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Cancha.css';
import Relacionado from '../components/Relacionado';
import { toast } from 'react-toastify';
import axios from 'axios';

const Cancha = () => {
    const { canchaId } = useParams();
    const { canchas, moneda, backendUrl, token } = useContext(AppContext);
    const diasSemana = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];

    const navigate = useNavigate();

    const [canchaInfo, setCanchaInfo] = useState(null);
    const [reservaFecha, setReservaFecha] = useState([]);
    const [fechaIndex, setFechaIndex] = useState(0);
    const [reservaHora, setReservaHora] = useState('');

    // Obtener información de la cancha seleccionada
    const fetchCanchaInfo = async () => {
        console.log('Buscando información de la cancha...');
        const cancha = canchas?.find((cancha) => cancha.id == canchaId);
        console.log('Datos de cancha:', cancha); // Verifica qué datos se están obteniendo
        if (cancha) {
            setCanchaInfo(cancha);
        } else {
            toast.error('No se encontró la información de la cancha.');
            navigate('/reserva'); // Redirige a la lista de canchas
        }
    };

    // Generar horarios disponibles para los próximos 7 días
    const horariosDisponibles = async () => {
        if (!canchaInfo) return; // Asegurarnos de que canchaInfo está disponible antes de continuar

        setReservaFecha([]);
        let ahora = new Date();

        for (let i = 0; i < 7; i++) {
            let fechaActual = new Date(ahora);
            fechaActual.setDate(ahora.getDate() + i);

            let horaFin = new Date();
            horaFin.setDate(ahora.getDate() + i);
            horaFin.setHours(22, 0, 0, 0);

            if (i === 0 && ahora.getHours() >= 21) {
                continue;
            }

            if (ahora.getDate() === fechaActual.getDate()) {
                fechaActual.setHours(ahora.getHours() > 8 ? ahora.getHours() + 1 : 8);
                fechaActual.setMinutes(0);
            } else {
                fechaActual.setHours(8);
                fechaActual.setMinutes(0);
            }

            let horasDisponibles = [];
            while (fechaActual < horaFin) {
                let formatoTiempo = fechaActual.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                horasDisponibles.push({
                    fecha: new Date(fechaActual),
                    hora: formatoTiempo,
                });
                fechaActual.setHours(fechaActual.getHours() + 1);
            }

            setReservaFecha((prev) => [...prev, horasDisponibles]);
        }
    };

    // Realizar la reserva de la cancha
    const reservarCancha = async () => {
        if (!token) {
            toast.warn("Inicia Sesión Para Reservar Canchas");
            return navigate("/login");
        }
    
        if (!canchaId) {
            toast.error("No se puede reservar una cancha inexistente.");
            return;
        }
    
        const fecha = reservaFecha[fechaIndex]?.[0]?.fecha;
        if (!fecha || !reservaHora) {
            toast.error("Por favor, selecciona una fecha y una hora.");
            return;
        }
    
        try {
            let dia = fecha.getDate();
            let mes = fecha.getMonth() + 1;
            let anio = fecha.getFullYear();
            const fullFecha = `${dia}_${mes}_${anio}`;
    
            const { data } = await axios.post(
                `${backendUrl}/api/user/reservar-cancha`,
                { canchaId, fullFecha, reservaHora },
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            if (data.success) {
                toast.success(data.message);
                navigate("/mis-reservas");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Error al realizar la reserva.");
        }
    };

    useEffect(() => {
        fetchCanchaInfo();
    }, [canchas, canchaId]);

    useEffect(() => {
        if (canchaInfo) {
            horariosDisponibles();
        }
    }, [canchaInfo]);

    return canchaInfo ? (
        <div className="cancha">
            <div className="cancha-card">
                <div>
                    <img src={canchaInfo.image} alt="" className="cancha-card-image" />
                </div>
                <div className="cancha-info">
                    <p>{canchaInfo.name}</p>
                    <div>
                        <p>{canchaInfo.lugar}</p>
                        <button>{canchaInfo.deporte}</button>
                    </div>

                    <div className="cancha-descripcion">
                        <p>{canchaInfo.descripcion}</p>
                        <p>
                            Precio por hora: <span>{moneda}{canchaInfo.precioHora}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="opciones-reserva">
                <p>Horarios de Reserva</p>
                <div className="dia-reserva">
                    {reservaFecha.length > 0 &&
                        reservaFecha.map((item, index) => (
                            <div
                                onClick={() => {
                                    setFechaIndex(index);
                                    setReservaHora('');
                                }}
                                className={`${fechaIndex === index ? 'active-day' : ''}`}
                                key={index}
                            >
                                <p>{item[0] && diasSemana[item[0].fecha.getDay()]}</p>
                                <p>{item[0] && item[0].fecha.getDate()}</p>
                            </div>
                        ))}
                </div>
                <div className="hora-reserva">
                    {reservaFecha.length > 0 &&
                        reservaFecha[fechaIndex]?.map((item, index) => (
                            <p
                                key={index}
                                onClick={() => setReservaHora(item.hora)}
                                className={`${item.hora === reservaHora ? 'active-day' : ''}`}
                            >
                                {item.hora.toLowerCase()}
                            </p>
                        ))}
                </div>
                <button onClick={reservarCancha}>Reservar Cancha</button>
            </div>
            <Relacionado canchaId={canchaId} deporte={canchaInfo.deporte} />
        </div>
    ) : (
        <p>Cargando información de la cancha...</p>
    );
};

export default Cancha;



