import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

/* =======================
   PROTECT MIDDLEWARE
   Verifies JWT and adds user to request
======================= */
export const protect = async (req, res, next) => {
    let token;

    // Check for Bearer token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Check if user is Admin (special case from login controller)
            if (decoded.id === "admin") {
                req.user = {
                    _id: "admin",
                    fullName: "Admin",
                    role: "admin",
                    registrationNumber: process.env.ADMIN_REG_NUMBER
                };
                return next();
            }

            // Fetch user from DB excluding password
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: "User not found with this token",
                });
            }

            next();
        } catch (error) {
            console.error("Auth Middleware Error:", error);
            res.status(401).json({
                success: false,
                message: "Not authorized to access this route",
            });
        }
    } else {
        res.status(401).json({
            success: false,
            message: "Not authorized, no token",
        });
    }
};
