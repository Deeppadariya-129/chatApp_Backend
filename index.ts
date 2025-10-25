import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectionDB from './config/db'
import authRoutes from './routes/auth.routes'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/auth', authRoutes)


const PORT = process.env.PORT || 2000


connectionDB().then(
    () => {
        app.listen(PORT, () => {
            console.log(`Server running successfully http://localhost:${PORT} ✅`);
        })
    }
).catch((error) => {
    console.log("⚠️ Failed to start server due to the database connection error : " , error)
})



