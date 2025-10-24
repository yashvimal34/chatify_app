import express from 'express';
import { createServer } from 'http';  // added just
import path from "path";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import { connectDB } from './lib/db.js';
import { ENV } from './lib/env.js';
import cors from "cors";
import { app, server, initializeSocket } from './lib/socket.js';  // added just


const __dirname = path.resolve();

const PORT = ENV.PORT || 3000

// ✅ Allow frontend access + large image payloads
app.use(cors({
    origin: ENV.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// make ready for deployment
if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.use((_, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });

}

// Initialize socket.io
initializeSocket();  // added just

server.listen(PORT, () => {
    console.log("server running:" + PORT)
    connectDB()
})