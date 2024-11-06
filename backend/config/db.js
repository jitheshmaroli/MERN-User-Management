import mongoose from "mongoose";

const db = () => {
    try {
        mongoose.connect(process.env.MONGO);
        console.log('database connected successfully')
    } catch (error) {
        console.log("error connecting to database:",error)
    }
}

export default db;