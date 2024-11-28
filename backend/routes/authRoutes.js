import express from 'express'
import { registerUser, loginUser, reservarCancha } from '../controllers/authController.js';
import authUser from '../middlewares/authUser.js';
const userRouter = express.Router();

// Ruta para registrarse
userRouter.post('/register', registerUser);
// Ruta para iniciar sesión
userRouter.post('/login', loginUser);
userRouter.post('/reservar-cancha', authUser, reservarCancha)

export default userRouter

