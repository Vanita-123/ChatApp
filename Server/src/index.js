import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import URI from "./db/index.js";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app, server } from "./SocketIO/server.js";

// path
dotenv.config({
  path: "./.env",
});
const PORT = process.env.PORT || 8005;
app.use(express.urlencoded({ extended: true }));

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`PORT: ${process.env.PORT}`);
});

// connection MongoDB
// const URI = process.env.MONGODB_URI;
// const connectDB = async () => {
//     // try {
//     //     await mongoose.connect(URI, {
//     //         // useNewUrlParser: true,
//     //         // useUnifiedTopology: true
//     //     });
//     //     console.log("Connected to MongoDB");

//     try {
//         await mongoose.connect(URI).then( console.log("Connected to MongoDB"));
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//     }
// };
// connectDB();
