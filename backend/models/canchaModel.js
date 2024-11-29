import mongoose from "mongoose";

const canchaSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    deporte: {type: String, required: true},
    lugar: {type: String, required: true},
    lugar_id: {type: String, required: true},
    direccion: {type: String, required: true},
    descripcion: {type: String, required: true},
    capacidad: {type: Number, required: true},
    precioHora: {type: Number, required: true},
    disponible: {type: Boolean, default: true},
    espacios_reservados: {type: Object, default: {}},
}, {minimize: false})

const canchaModel = mongoose.models.cancha || mongoose.model('cancha', canchaSchema)

export default canchaModel