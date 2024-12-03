import canchaModel from "../models/canchaModel.js";

const cambiarDisponibilidad = async (req, res) => {
    try {
        const canchaId = req.body
        const canchaData = await canchaModel.findById(canchaId)
        await canchaModel.findByIdAndUpdate(canchaId, {disponible: !canchaData.disponible})
        res.json({success:true, message: 'Disponibilidad Cambiada'})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
}

const canchaList = async (req, res) => {
    try {
        const canchas = await canchaModel.find({}, { name: 1, deporte: 1, lugar: 1, disponible: 1, precioHora: 1 });
        res.json({ success: true, canchas });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const obtenerCancha = async (req, res) => {
    try {
        const { id } = req.params;
        const cancha = await canchaModel.findById(id);
        if (!cancha) {
            return res.status(404).json({ success: false, message: "Cancha no encontrada" });
        }
        res.json({ success: true, cancha });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {cambiarDisponibilidad, canchaList, obtenerCancha}