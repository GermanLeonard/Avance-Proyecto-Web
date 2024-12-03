import express from 'express';
import { registerUser, loginUser, reservarCancha, obtenerReservas} from '../controllers/authController.js';
import { canchaList, obtenerCancha } from '../controllers/canchaController.js';
import authUser from '../middlewares/authUser.js';

const userRouter = express.Router();

// Rutas de usuarios
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/reservar-cancha', authUser, reservarCancha);
userRouter.get('/mis-reservas', authUser, obtenerReservas);

// Rutas de canchas
userRouter.get('/canchas', canchaList);
userRouter.get('/canchas/:id', obtenerCancha);

export default userRouter;

