import express from 'express'
import { agregarCancha, loginAdminGeneral } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { cambiarDisponibilidad } from '../controllers/canchaController.js'

const adminRouter = express.Router()

adminRouter.post('/agregar-cancha', authAdmin, upload.single('image'), agregarCancha)
adminRouter.post('/login',loginAdminGeneral)
//adminRouter.post('/canchas', authAdmin todasCanchas)
adminRouter.post('/cambiar-disponibilidad',authAdmin, cambiarDisponibilidad)

export default adminRouter