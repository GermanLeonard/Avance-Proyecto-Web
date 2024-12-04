import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import adminSedeModel from '../models/adminSedeModel.js'
import reservaModel from '../models/reservaModel.js';
import canchaModel from '../models/canchaModel.js';

const loginAdminSede = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Buscar el adminSede por correo electrónico
      const adminSede = await adminSedeModel.findOne({ email });
      if (!adminSede) {
        return res.status(404).json({ success: false, message: "Credenciales Inválidas" });
      }
  
      // Comparar contraseñas
      const isMatch = await bcrypt.compare(password, adminSede.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Credenciales Inválidas" });
      }
  
      // Generar token JWT
      const token = jwt.sign(
        { id: adminSede._id, sede: adminSede.sede },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
  
      res.json({ success: true, token, sede: adminSede.sede });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error en el servidor" });
    }
  };
  
const getReservaPorSede = async (req, res) => {
    try {
        const { sede } = req;
        const reservas = await reservaModel.find({ "canchaData.lugar": sede });
    
        res.json({ success: true, reservas });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error en el servidor" });
    }
}

const cambiarDisponibilidadCancha = async (req, res) => {
    try {
      const { canchaId } = req.body;
      const { sede } = req;
  
      const cancha = await canchaModel.findOne({ _id: canchaId, lugar: sede });
      if (!cancha) {
        return res.status(404).json({ success: false, message: "Cancha no encontrada en esta sede" });
      }
  
      cancha.disponible = !cancha.disponible;
      await cancha.save();
  
      res.json({ success: true, message: "Disponibilidad actualizada", cancha });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error en el servidor" });
    }
  };

export {getReservaPorSede, loginAdminSede, cambiarDisponibilidadCancha}