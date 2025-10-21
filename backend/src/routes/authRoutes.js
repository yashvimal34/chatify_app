import express from "express";
import { signup, login, logout, updateProfile } from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import { arcjetProtection } from "../middleware/arcjetMiddleware.js";

const router = express.Router();

router.use(arcjetProtection);

// signup route
router.post("/signup", signup);

// login route
router.post("/login", login);

// logout route
router.post("/logout", logout);

// Update Profile route
router.put("/update-profile", protectRoute, updateProfile);

// get Route:
router.get("/check", protectRoute, (req, res) => res.status(200).json(req.user));

export default router;