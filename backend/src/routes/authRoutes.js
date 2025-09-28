import express from "express";

const router = express.Router();

router.get("/dashboard", (req, res) => {
    res.send("dashboard");
});

router.get("/login", (req, res) => {
    res.send("login");
});

router.get("/signup", (req, res) => {
    res.send("sign up")
});

export default router;