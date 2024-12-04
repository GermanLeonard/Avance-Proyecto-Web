import jwt from 'jsonwebtoken'

const authAdminSede = (req, res, next) => {
    try {
        const {adminsedetoken} = req.headers
        if(!adminsedetoken){
            return res.json({success:false, message: 'No Estas Autorizado 1'})
        }
        const decoded = jwt.verify(adminsedetoken, process.env.JWT_SECRET);
        req.adminSedeId = decoded.id;
        req.sede = decoded.sede; // Extraemos la sede del token
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ success: false, message: "Token inválido" });
    }
}

export default authAdminSede