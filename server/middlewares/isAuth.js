import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
const isAuth = async (req,res,next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({ message: "Token not found" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id)
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `Authentication error ${error.message}` })
    }
}

export default isAuth;