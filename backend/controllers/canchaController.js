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

const canchaList = async () => {
    try {
        const canchas = await canchaModel.find({})
        res.json({success:true, canchas})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

export {cambiarDisponibilidad, canchaList}