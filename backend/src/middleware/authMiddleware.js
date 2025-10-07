import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = res.cookie.jwt;
        if (!token) return res.status(401).json({ message: "Unauthorized - No token Provided" });

        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        if (!decoded) return res.status(401).json({ message: "Unauthorized - Invalid token" });

        const user = await User.findOne(decoded.userID).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protect Route middleware:", error);
        res.status(500).json({ message: "Internal Server error" });
    };
};