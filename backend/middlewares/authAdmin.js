import jwt from 'jsonwebtoken'

const authAdmin = async (req, res, next) => {
    try {
        const {admintoken} = req.headers
        console.log("Token recibido:", req.headers.admintoken || req.headers.authorization);
        if (!admintoken){
            return res.json({success:false, message:'No autorizado 3'})
        }
        const token_decode = jwt.verify(admintoken, process.env.JWT_SECRET)
        if(token_decode !== process.env.ADMIN_GENERAL_EMAIL + process.env.ADMIN_GENERAL_PASSWORD) {
            return res.json({success:false, message: 'No autorizado 4'})
        }
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export default authAdmin