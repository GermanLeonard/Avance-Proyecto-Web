import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        console.log("Encabezado recibido:", req.headers.authorization);
        if (!token) {
            return res.json({ success: false, message: 'No autorizado 1' });
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: token_decode.id }; // Asegúrate de asignar `id` correctamente
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


export default authUser