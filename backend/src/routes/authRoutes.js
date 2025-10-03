import express from "express";
import { signup } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);

router.get("/login", (req, res) => {
    res.send("login");
});

router.get("/signup", (req, res) => {
    res.send("sign up")
});

export default router;