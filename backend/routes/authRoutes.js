import express from "express";
import { sendOtp } from "../utils/sendOtp.js";
import { send_Otp } from "../controllers/otpController.js";

const router  = express.Router();

router.post("/send-otp" , send_Otp)

export default router;