import canchaModel from '../models/canchaModel.js'
import jwt from 'jsonwebtoken'

const agregarCancha = async (req, res) => {
    try {
        const {name, lugar, lugar_id, direccion, deporte, descripcion, capacidad, precioHora} = req.body
        if (!name || !lugar || !lugar_id || !direccion || !deporte || !descripcion || !capacidad || !precioHora){
            return res.json({success:false, message:"faltan detalles"})
        }

        const canchaData = {
            name,
            lugar,
            lugar_id,
            direccion,
            deporte,
            descripcion,
            capacidad,
            precioHora
        }
        const newCancha = new canchaModel(canchaData)
        await newCancha.save()
        res.json({success:true, message: "Cancha Agregada"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//API para admin general login
const loginAdminGeneral = async (req, res) => {
    try{
        const {email, password} = req.body
        if (email == process.env.ADMIN_GENERAL_EMAIL && password == process.env.ADMIN_GENERAL_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true, token})
        } else {
            res.json({success: false, message: "Credenciales invalidas"})
        }
    }catch (error){
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

const todasCanchas = async () => {
    
}

export {agregarCancha, loginAdminGeneral}