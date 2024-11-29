import mongoose from 'mongoose'

const conectarDB = async () => {
    mongoose.connection.on('connected', () => console.log("DB conectada"))
    await mongoose.connect(`${process.env.MONGO_URI}/Sport_Spot`)
}

export default conectarDB