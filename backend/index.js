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

app.listen(PORT, () => {
    console.log(`serever running on port: ${PORT}`);
})