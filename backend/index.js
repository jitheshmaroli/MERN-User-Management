import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cookieParser from 'cookie-parser';
import path from 'path';



const app = express();

app.use(express.json());
app.use(cookieParser());



dotenv.config();

db();

const PORT = 3000;

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/admin',adminRoutes);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    return res.status(statusCode).json({
        success : false,
        message,
        statusCode
    });
});

app.listen(PORT, () => {
    console.log(`serever running on port: ${PORT}`);
})