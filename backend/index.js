import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";


const app = express();
app.use(express.json());
dotenv.config();
db();
const PORT = 3000;
app.use('/',userRoutes);

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