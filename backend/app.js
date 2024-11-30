import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import adminGeneralRouter from './routes/adminGeneralRoute.js'

//app config
const app = express()
const port = process.env.PORT || 3000
connectDB()

//middlewares
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/admin-general', adminGeneralRouter)
//localhost:3000/api/admin-general/agregar-empleado
app.get('/', (req, res) => {
  res.send('API funcional')
})

app.listen(port, () => console.log('servidor corriendo en puerto ', port))