import bkb from './imagenes/bkb.png'
import futbol from './imagenes/futbol.png'
import padel from './imagenes/padel.png'
import logo from './imagenes/logo.png'
import userImg from './imagenes/user.png'
import dropdownIcon from './imagenes/down-chevron.png'
import AntiguoCuscatlan from './imagenes/AntiguoCuscatlan.png'
import LosProceres from './imagenes/LosProceres.png'
import ElPlatillo from './imagenes/ElPlatillo.png'
import CanchaFutbolEjemplo from './imagenes/canchaFutbolEjemplo.jpg'
import CanchaBasketEjemplo from './imagenes/CanchaBasketEjemplo.jpg'
import CanchaPadelEjemplo from './imagenes/CanchaPadelEjemplo.jpg'
import disponible from './imagenes/disponible.png'

export const assets = {
    bkb,
    futbol,
    padel,
    logo,
    userImg,
    dropdownIcon,
    disponible
}

export const sucursal = [
    {
        id: 1,
        lugar: 'Antiguo Cuscatlán',
        descripcion: 'En nuestra sede de Antiguo Cuscatlán, encontrarás canchas de fútbol 6x6, básquetbol y pádel, con instalaciones diseñadas para ofrecer comodidad y calidad en cada juego. Ideales para partidos entre amigos, entrenamientos o eventos deportivos.',
        image: AntiguoCuscatlan
    },
    {
        id: 2,
        lugar: 'Los Próceres',
        descripcion: 'Ubicada en Los Próceres, nuestra sede cuenta con modernas canchas de fútbol 6x6 y canchas techadas de básquetbol, perfectas para jugar en cualquier clima. Disfruta de instalaciones cómodas, con iluminación y superficies de calidad, ideales para entrenamientos y partidos entre amigos.',
        image: LosProceres
    },
    {
        id: 3,
        lugar: 'El Platillo',
        descripcion: 'Disfruta el mejor fútbol en nuestra cancha 6x6 en El Platillo. Con césped sintético y excelente iluminación, es ideal para jugar con amigos o entrenar. ¡Reserva y ven a vivir la emoción del deporte!',
        image: ElPlatillo
    },
]

export const canchas = [
    {
        id: 'cancha1',
        name: 'futbol A1',
        image: CanchaFutbolEjemplo,
        lugar: sucursal[0].lugar,
        lugar_id: sucursal[0].id,
        deporte: 'futbol',
        descripcion: 'cancha de futbol 11',
        capacidad: '30',
        precioHora: 20
    },
    {
        id: 'cancha2',
        name: 'futbol A2',
        image: CanchaFutbolEjemplo,
        lugar: sucursal[0].lugar,
        lugar_id: sucursal[0].id,
        deporte: 'futbol',
        descripcion: 'cancha de futbol sala',
        capacidad: '15',
        precioHora: 10
    },
    {
        id: 'cancha3',
        name: 'futbol B1',
        image: CanchaFutbolEjemplo,
        lugar: sucursal[1].lugar,
        lugar_id: sucursal[1].id,
        deporte: 'futbol',
        descripcion: 'cancha de futbol sala',
        capacidad: '15',
        precioHora: 10
    },
    {
        id: 'cancha4',
        name: 'basketball B1',
        image: CanchaBasketEjemplo,
        lugar: sucursal[1].lugar,
        lugar_id: sucursal[1].id,
        deporte: 'basketball',
        descripcion: 'cancha de basketball con espacio cerrado',
        capacidad: '15',
        precioHora: 8
    },
    {
        id: 'cancha5',
        name: 'basketball C1',
        image: CanchaBasketEjemplo,
        lugar: sucursal[2].lugar,
        lugar_id: sucursal[2].id,
        deporte: 'basketball',
        descripcion: 'cancha de basket para jugar ente amigos al aire libre',
        capacidad: '15',
        precioHora: 8
    },
    {
        id: 'cancha6',
        name: 'padel C1',
        image: CanchaPadelEjemplo,
        lugar: sucursal[2].lugar,
        lugar_id: sucursal[2].id,
        deporte: 'padel',
        descripcion: 'cancha de padel 2 vs 2',
        capacidad: '6',
        precioHora: 30
    },
    {
        id: 'cancha7',
        name: 'padel C2',
        image: CanchaPadelEjemplo,
        lugar: sucursal[2].lugar,
        lugar_id: sucursal[2].id,
        deporte: 'padel',
        descripcion: 'cancha de padel 2 vs 2',
        capacidad: '6',
        precioHora: 30
    }
]