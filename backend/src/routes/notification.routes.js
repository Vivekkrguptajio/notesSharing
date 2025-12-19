import { Router } from "express";
import { verifyJWT, verifyAdmin } from "../middleware/auth.middleware.js";
import {
    createNotification,
    getNotifications,
} from "../controllers/notification.controller.js";

const router = Router();

// Public route to get notifications (or protected if you prefer, currently making it accessible to logged in users at least, or public)
// Let's make fetching public or just verifyJWT if we want only logged in users. 
// User request said "sab ko Dekhega" (everyone will see).
// I will keep it open or verifyJWT? Let's use verifyJWT for now to ensure they are users, or just open.
// Since it is a website update, maybe public is better so even non-logged in users can see updates?
// For now, let's stick to verifyJWT for fetching if the user flow implies logged in functionality, but actually updates usually are public.
// However, the Navbar 'bell' usually appears for logged in users.
// Let's make fetching public for flexibility, but create is admin only.

router.route("/").get(getNotifications);
router.route("/").post(verifyJWT, verifyAdmin, createNotification);

export default router;
