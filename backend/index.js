import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

// Routes
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";

// Database
import connectToMongoDB from "./database/connect.js";

// Socket.io
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
  connectToMongoDB();
});
