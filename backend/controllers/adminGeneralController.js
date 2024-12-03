import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import canchaModel from '../models/canchaModel.js'
import adminSedeModel from '../models/adminSedeModel.js'
import jwt from 'jsonwebtoken'

//API para agregar adminSede
const addAdminSede = async (req, res) => {
    try {
        const {username, email, password, sede} = req.body

        if(!username, !email, !password, !sede){
            return res.json({success: false, message: "Detalles Faltantes"})
        }

        //validando formatos
        if(!validator.isEmail(email)){
            return res.json({success: false, message: "Introduce Un Correo Válido"})
        }
        if(password.length < 8){
            return res.json({success: false, message: "Introduce Una Contraseña Fuerte"})
        }

        //hasheando la contrasena
        const salt = await bcrypt.genSalt(10)
        const hashedContrasena = await bcrypt.hash(password, salt)

        const adminSedeData = {
            username,
            email,
            password: hashedContrasena,
            sede,
        }
        const newAdminSede = new adminSedeModel(adminSedeData)
        await newAdminSede.save()
        res.json({success:true, message:"Empleado Agregado"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

//API para agregar cancha
const addCancha = async(req, res) => {
    try{
        const {name, lugar, lugar_id, direccion, deporte, descripcion, capacidad, precioHora} = req.body

        if(!name, !lugar, !lugar_id, !direccion, !deporte, !descripcion, !capacidad, !precioHora){
            return res.json({success: false, message: "Detalles Faltantes"})
        }


        const canchaData = {
            name,
            lugar,
            lugar_id,
            direccion,
            deporte,
            descripcion,
            capacidad,
            precioHora,
            fecha: Date.now()
        }
        const newCancha = new canchaModel(canchaData)
        await newCancha.save()
        res.json({success:true, message:"Cancha Agregada"})
    } catch (error){
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

//API para login de admin general
const loginAdminGeneral= async(req, res) => {
    try {
        const {email, password} = req.body 
        if(email == process.env.ADMIN_GENERAL_EMAIL && password == process.env.ADMIN_GENERAL_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true, token})
        } else{
            res.json({success: false, message: "Credenciales Inválidas"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

//API para conseguir los datos de todas las cnachas
const canchasTodas = async (req, res) => {
    try {
        const canchas = await canchaModel.find({})
        res.json({success:true, canchas})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

const cambiarDisponibilidad = async (req, res) => {
    try {
        const {canchaId} = req.body
        const canchaData = await canchaModel.findById(canchaId)
        await canchaModel.findByIdAndUpdate(canchaId,{disponible: !canchaData.disponible})
        res.json({success:true, message: 'Disponibilidad Cambiada'})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export {addAdminSede, addCancha, loginAdminGeneral, canchasTodas, cambiarDisponibilidad}