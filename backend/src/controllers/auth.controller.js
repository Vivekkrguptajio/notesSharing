import User from "../models/User.model.js";
import { hashPassword } from "../utils/hashPassword.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

/* =======================
   SIGNUP CONTROLLER
======================= */
export const signup = async (req, res) => {
  try {
    const {
      fullName,
      registrationNumber,
      branch,
      semester,
      password,
    } = req.body;

    // Validation
    if (
      !fullName ||
      !registrationNumber ||
      !branch ||
      !semester ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if trying to signup with admin credentials
    const adminRegNumber = process.env.ADMIN_REG_NUMBER;
    if (registrationNumber === adminRegNumber) {
      return res.status(400).json({
        success: false,
        message: "This registration number is reserved. Please use a different registration number.",
      });
    }

    // Existing user check
    const existingUser = await User.findOne({ registrationNumber });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this registration number",
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({
      fullName,
      registrationNumber,
      branch,
      semester,
      password: hashedPassword,
      role: "student",
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        registrationNumber: user.registrationNumber,
        role: user.role,
        isUploader: user.isUploader || false,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/* =======================
   LOGIN CONTROLLER
======================= */
export const login = async (req, res) => {
  try {
    const { registrationNumber, password } = req.body;

    // Validation
    if (!registrationNumber || !password) {
      return res.status(400).json({
        success: false,
        message: "Registration number and password are required",
      });
    }

    // Check if credentials match admin credentials from .env
    const adminRegNumber = process.env.ADMIN_REG_NUMBER;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Debug log
    console.log('🔍 Login attempt:', { registrationNumber, password });
    console.log('🔑 Admin credentials from .env:', { adminRegNumber, adminPassword });
    console.log('✅ Match?', registrationNumber === adminRegNumber && password === adminPassword);

    if (registrationNumber === adminRegNumber && password === adminPassword) {
      // Admin login - create admin user object
      const adminUser = {
        _id: "admin",
        fullName: "Admin",
        registrationNumber: adminRegNumber,
        role: "admin",
      };

      // Generate JWT for admin
      const token = generateToken(adminUser);

      return res.status(200).json({
        success: true,
        message: "Admin login successful",
        token,
        user: {
          id: adminUser._id,
          fullName: adminUser.fullName,
          registrationNumber: adminUser.registrationNumber,
          role: adminUser.role,
          isUploader: false,
        },
      });
    }

    // Normal user authentication
    const user = await User.findOne({ registrationNumber });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT
    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        registrationNumber: user.registrationNumber,
        role: user.role,
        isUploader: user.isUploader || false,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
