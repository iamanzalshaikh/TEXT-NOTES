import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import generateToken from '../config/token.js';

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name: name.trim(),
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = generateToken(user._id);



        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ message: "Login successful", user });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const logout = async (req, res) => {
    try {
        console.log("🔌 [logout] Request received");

        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "Strict",  // ✅ Match how it was set
            secure: false,       // ✅ Set to true only in production with HTTPS
            path: "/",           // ✅ Make sure it matches the original cookie path
        });

        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("❌ Logout Error:", error.message);
        return res.status(500).json({ message: "Logout failed" });
    }
};


export const googleLogin = async (req, res) => {
    try {
        console.log("📥 Google Login API Hit");

        const { name, email } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            // Add default DOB to satisfy schema validation
            user = await User.create({
                name,
                email,
                dob: new Date("2000-01-01"), // Default DOB
            });
        }

        const token = generateToken(user._id);
        console.log("🔐 Token Generated:", token);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("❌ Google Login Error (FULL):", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
