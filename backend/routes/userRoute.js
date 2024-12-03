import express from 'express'
import { loginUsuario, registrarUsuario, reservarCancha } from '../controllers/userController.js'
import authUser from '../middleware/authUser.js'

const userRouter = express.Router()

userRouter.post('/registrar', registrarUsuario)
userRouter.post('/login', loginUsuario)
userRouter.post('/reservar-cancha',authUser, reservarCancha)


export default userRouter