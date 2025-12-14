import express from "express";
import { signup, login, updateProfile } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// SIGNUP
router.post("/signup", signup);

// LOGIN
router.post("/login", login);

// UPDATE PROFILE
router.put("/profile", protect, updateProfile);

export default router;
