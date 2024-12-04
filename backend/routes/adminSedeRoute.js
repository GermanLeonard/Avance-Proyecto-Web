import express, { Router } from 'express'
import { loginAdminSede, getReservaPorSede, cambiarDisponibilidadCancha } from '../controllers/adminSedeController.js'
import authAdminSede from '../middleware/authAdminSede.js'

const adminSedeRouter = express.Router()

adminSedeRouter.post('/login', loginAdminSede)
adminSedeRouter.get('/reservas', authAdminSede, getReservaPorSede)
adminSedeRouter.post('/cambiar-disponibilidad', authAdminSede, cambiarDisponibilidadCancha)

export default adminSedeRouter
