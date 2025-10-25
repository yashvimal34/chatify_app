import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const app = express();
const server = http.createServer(app);
let io;

const onlineUsers = new Map(); // userId -> socketId

// Emit an event to a specific user if they are online.
export function emitToUser(userId, event, payload) {
    if (!userId) return false;
    const socketId = onlineUsers.get(String(userId));
    if (socketId && io) {
        io.to(socketId).emit(event, payload);
        return true;
    }
    return false;
}
const initializeSocket = () => {
    io = new Server(server, {
        cors: {
            origin: ENV.CLIENT_URL || "http://localhost:5173",
            credentials: true,
        },
    });

    // Middleware to authenticate socket connections
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            if (!token) {
                return next(new Error("Not authorized - No token"));
            }

            const decoded = jwt.verify(token, ENV.JWT_SECRET);
            const user = await User.findById(decoded.userID).select("-password");

            if (!user) {
                return next(new Error("User not found"));
            }

            socket.user = user;
            next();
        } catch (error) {
            console.log("Socket authentication error:", error);
            next(new Error("Not authorized - Invalid token"));
        }
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.user.fullName, "Socket ID:", socket.id);

        // Store user connection
        onlineUsers.set(socket.user._id.toString(), socket.id);

        // Broadcast online users
        io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));

        // Handle disconnect
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.user.fullName);
            onlineUsers.delete(socket.user._id.toString());
            io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));
        });
    });

    return io;
};

// Export what we need
export { app, server, initializeSocket, io };