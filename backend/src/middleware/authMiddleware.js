import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const protectRoute = async (req, res, next) => {
    try {
        // Support token from cookie or Authorization header (Bearer)
        const cookieToken = req.cookies && req.cookies.jwt;
        const header = req.headers && req.headers.authorization;
        const bearerToken = header && header.startsWith("Bearer ") ? header.split(" ")[1] : null;
        const token = cookieToken || bearerToken;

        if (!token) return res.status(401).json({ message: "Unauthorized - No token Provided" });

        let decoded;
        try {
            decoded = jwt.verify(token, ENV.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }

        const user = await User.findById(decoded.userID).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protect Route middleware:", error);
        res.status(500).json({ message: "Internal Server error" });
    };
};