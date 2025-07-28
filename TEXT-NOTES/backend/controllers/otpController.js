import Otp from "../models/otpModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import generateToken from "../config/token.js";



dotenv.config();


function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}


export const sendOTP = async (req, res) => {
    const { email } = req.body;


    if (!email || !email.includes("@")) {

        return res.status(400).json({ message: "Valid email is required" });
    }

    const otp = generateOTP();


    try {
        // Save OTP to DB
        await Otp.create({ email, otp });


        // Gmail transporter using app password from .env
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: `"Your App Name" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your OTP Code",
            html: `<p>Your One-Time Password (OTP) is: <strong>${otp}</strong></p>`
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log(`✅ OTP email sent successfully to: ${email}`);

        res.status(200).json({ message: "OTP sent to your email!" });
    } catch (error) {
        console.error("❌ Error sending OTP:", error);
        res.status(500).json({ message: "Failed to send OTP" });
    }
};






export const verifyOTP = async (req, res) => {
    const { email, otp, name, dob } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
    }

    try {

        const record = await Otp.findOne({ email, otp });
        if (!record) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }


        let user = await User.findOne({ email });


        if (!user) {
            if (!name || !dob) {
                return res.status(400).json({ message: "Name and DOB are required" });
            }

            user = await User.create({
                email,
                name,
                dob,
            });
        }


        const token = generateToken(user._id);

        // Set token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        console.log("✅ Token cookie set:", token);


        res.status(200).json({
            message: "OTP verified and user authenticated",
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        });

    } catch (error) {
        console.error("Error in verifyOTP:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
