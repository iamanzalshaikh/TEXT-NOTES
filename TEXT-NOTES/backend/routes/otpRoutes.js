import express from "express";
import { sendOTP, verifyOTP } from "../controllers/otpController.js";

const router = express.Router();

// POST /api/otp/send
router.post("/send", sendOTP);

// POST /api/otp/verify
router.post("/verify", verifyOTP);

export default router;
