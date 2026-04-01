import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import websiteRouter from "./routes/website.routes.js";
import billingRouter from "./routes/billing.routes.js";
import { stripeWebhook } from "./controllers/stripeWebhook.js";

const app = express();
app.set("trust proxy", 1);
app.post("/api/stipe/webhook", express.raw({ type: "application/json" }), stripeWebhook);
app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), stripeWebhook);
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://ai-website-builder-1-49g7.onrender.com", // Update with your frontend URL
    credentials: true, // Allow cookies to be sent with requests
  }),
);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/website", websiteRouter);
app.use("/api/billing", billingRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
