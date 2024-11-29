import mongoose from 'mongoose'

const reservaSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    canchaId: {type: String, required: true},
    reservaFecha: {type: String, required: true},
    reservaHora: {type: String, required: true},
    userData: {type: Object, required: true},
    canchaData: {type: Object, required: true},
    cantidad: {type: Number, required: true},
    fecha: {type: Number, required: true},
    cancelado: {type: Boolean, default: false},
    pagado: {type: Boolean, default: false},
    completado: {type: Boolean, default: false}
}) 

const reservaModel = mongoose.models.reserva || mongoose.model('reserva', reservaSchema)

export default reservaModel