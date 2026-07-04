import express from "express";
import { sendOtp } from "../utils/sendOtp.js";
import {sendOtpController, verifyotpController } from "../controllers/otpController.js";

const router  = express.Router();

router.post("/send-otp" , sendOtpController)
router.post("/verify-otp",verifyotpController)

export default router;