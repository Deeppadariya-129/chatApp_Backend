import { Request, Response } from "express";
import User from "../models/User"
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtToken";



export const register = async (req: Request, res: Response): Promise<void> => {
    const { email, name, password, avatar } = req.body;

    try {
        //Check missing details
        if (!email || !name || !password) {
            res.status(400).json({
                success: false,
                message: "Missing required fields: email, name, and password are required.",
            });
            return;
        }

        //Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({
                success: false,
                message: "User already exists with this email.",
            });
            return;
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create new user
        const newUser = new User({
            email,
            name,
            password: hashedPassword,
            avatar: avatar || "",
        });

        await newUser.save();

        // Token
        const token = generateToken(newUser)

        //Send success response (exclude password)
        res.status(201).json({
            success: true,
            message: "User registered successfully.",
            token
        });
        return

    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};



export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        //Validate required fields
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "Missing required fields: email and password are required.",
            });
            return;
        }

        //Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found with this email.",
            });
            return;
        }

        //Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({
                success: false,
                message: "Invalid password.",
            });
            return;
        }

        //Generate JWT token
        const token = generateToken(user);

        //Send success response (exclude password)
        res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
        });
        return;

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};

