import express from "express";
import { signup, login } from "../controllers/auth.controller.js";

const router = express.Router();

// SIGNUP
router.post("/signup", signup);

// LOGIN
router.post("/login", login);

export default router;
