import mongoose from "mongoose";

const adminSedeSchema = new mongoose.Schema({
    username: {type: String, required: true, unique:true},
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    sede: {type: String, required: true},
})

const adminSedeModel = mongoose.models.adminSede || mongoose.model('adminSede', adminSedeSchema)

export default adminSedeModel