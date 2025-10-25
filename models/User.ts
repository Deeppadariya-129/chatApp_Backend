import mongoose, { model, Schema } from "mongoose";
import { UserProps } from "../types";

const userSchema = new Schema<UserProps>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        default: ""
    },
    created: {
        type: String,
        default:Date.now()

    }
})


export default model<UserProps>("User" , userSchema)