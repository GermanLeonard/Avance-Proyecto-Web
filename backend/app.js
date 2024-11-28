import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import conectarDB from './config/mongodb.js'
import adminRouter from './routes/adminRoutes.js'
import userRouter from './routes/authRoutes.js'

const app = express()
const PORT = process.env.PORT || 3000;
conectarDB()

// Middleware para analizar JSON y habilitar al frontend conectar con el backend
app.use(express.json());
app.use(cors())

// API endpoints
app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
  res.send('prueba API')
})

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

