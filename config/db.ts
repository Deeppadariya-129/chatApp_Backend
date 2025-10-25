import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URL = process.env.MONGO_URI

const connectionDB = async () : Promise<void> => {
    try {
        await mongoose.connect(MONGO_URL as string)
        console.log("✅ Database Connected successfully");
        
    } catch (error) {
        console.log("⚠️ Error to connect database", error); 
        throw error
    }
}

export default connectionDB