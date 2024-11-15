import bkb from './imagenes/bkb.png'
import futbol from './imagenes/futbol.png'
import padel from './imagenes/padel.png'
import logo from './imagenes/logo.png'
import userImg from './imagenes/user.png'
import dropdownIcon from './imagenes/down-chevron.png'
import AntiguoCuscatlan from './imagenes/AntiguoCuscatlan.png'
import LosProceres from './imagenes/LosProceres.png'
import ElPlatillo from './imagenes/ElPlatillo.png'

export const assets = {
    bkb,
    futbol,
    padel,
    logo,
    userImg,
    dropdownIcon
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
        name: 'futbol C1',
        image: '',
        lugar: sucursal[1].lugar,
        lugar_id: 1,
        deporte: 'futbol',
        descripcion: 'cancha de futbol 11',
        capacidad: '30',
        precioHora: 20
    }
]