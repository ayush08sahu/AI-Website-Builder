import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const googleAuth = async (req,res) => {
    try {
        const { name, email, avatar } = req.body;
        if(!email){
            return res.status(400).json({ message: "Email is required" })
        }
        const user = await User.findOne({ email });
        if(!user){
            user = await User.create({ name, email, avatar });
        }
        const token = await jwt.sign({ id: user._id },process.env.JWT_SECRET, { expiresIn: "30d" })
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // Set to true in production with HTTPS
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
        })
        return res.status(200).json({ message: "User authenticated", user, token })
    } catch (error) {
        return res.status(500).json({ message: `Google authentication error ${error.message}` })
    }
}

export const logout = async (req,res) => {
    try {
        return res.clearCookie("token", {
            httpOnly: true,
            secure: false, // Set to true in production with HTTPS
            sameSite: "strict",
        })
    } catch (error) {
        return res.status(500).json({ message: `Logout error ${error.message}` })
    }
}