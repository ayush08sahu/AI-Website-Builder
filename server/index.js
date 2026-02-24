import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';



const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // Update with your frontend URL
    credentials: true, // Allow cookies to be sent with requests
}))
app.use("/api/auth", authRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});