import validator from 'validator'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import canchaModel from '../models/canchaModel.js';
import reservaModel from '../models/reservaModel.js';

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
    }

    if(!validator.isEmail(email)){
      return res.json({success: false, message:"Correo Inválido"})
    }

    if(password.length < 8){
      return res.json({success: false, message:"Contrasena Débil"})
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'El usuario ya existe' });
    }

    const salt  = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userData = {
      username,
      email,
      password: hashedPassword
    }

    const newUser = new User(userData)
    const userDB = await newUser.save()

    const token = jwt.sign({id:userDB._id}, process.env.JWT_SECRET)
    res.status(201).json({ success: true, message: 'Usuario registrado exitosamente', token });
  } catch (error) {
    res.status(500).json({ success: false ,message: 'Error al registrar usuario ' + error.message});
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Credenciales inválidas' });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if(isMatch){
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.status(200).json({ success:true, message: 'Inicio de sesión exitoso', token });
    }else{
      res.status(404).json({ success: false, message: 'Credenciales inválidas' });
    }
    console.log('Token almacenado:', data.token);
  } catch (error) {
    res.status(400).json({ message: 'Error al iniciar sesión', error });
  }
};

const reservarCancha = async (req, res) => {
  try {
    const {userId, canchaId, reservaFecha, reservaHora} = req.body
    const canchaData = await canchaModel.findById(canchaId)

    if (!canchaData.disponible) {
      return res.json({success: false, message:'Cancha NO Disponible'})
    }

    let espacios_reservados = canchaData.espacios_reservados

    if (espacios_reservados[reservaFecha]){
      if(espacios_reservados[reservaFecha].includes(reservaHora)){
        return res.json({success: false, message:'Espacio NO Disponible'})
      } else{
        espacios_reservados[reservaFecha].push(reservaHora)
      }
    } else{
      espacios_reservados[reservaFecha] = []
      espacios_reservados[reservaFecha].push(reservaHora)
    }

    const userData = await userModel.findById(userId).select('-password')
    delete canchaData.espacios_reservados //no queremos los espacios reservados en el canchaData de reservaModel
    const reservaData = {
      userId,
      canchaId,
      userData,
      canchaData,
      cantidad: canchaData.precioHora,
      reservaHora,
      reservaFecha,
      fecha: Date.now()
    }

    const newReserva = new reservaModel(reservaData)
    await newReserva.save()

    await canchaModel.findByIdAndUpdate(canchaId,{espacios_reservados})
    res.json({success:true, message:'Cancha Reservada'})

  } catch (error) {
    res.json({success: false, message: error.message})
  }
}

export {registerUser, loginUser, reservarCancha}


  