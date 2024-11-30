import express from 'express'
import { addAdminSede, addCancha, loginAdminGeneral } from '../controllers/adminGeneralController.js'
import upload from '../middleware/multer.js'
import authAdminGeneral from '../middleware/authAdminGeneral.js'

const adminGeneralRouter = express.Router()

adminGeneralRouter.post('/agregar-empleado', authAdminGeneral, upload.single('image'), addAdminSede)
adminGeneralRouter.post('/agregar-cancha', authAdminGeneral, upload.single('image'), addCancha)
adminGeneralRouter.post('/login', loginAdminGeneral)

export default adminGeneralRouter