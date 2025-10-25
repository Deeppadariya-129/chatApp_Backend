import jwt from 'jsonwebtoken'
import { UserProps } from '../types'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET


export const generateToken = async (user:UserProps) => {
    const payload = {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        }
    }

    return jwt.sign(payload, JWT_SECRET as string , {expiresIn: '30d'} )
}