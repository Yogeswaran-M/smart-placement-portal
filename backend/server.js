import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path';
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
//connect mongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/application", applicationRoutes);

app.use("/uploads", express.static("uploads"));



app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("Smart Placement Portal API Running");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`server is running on ${PORT}`);   
})