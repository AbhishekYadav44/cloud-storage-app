import express from "express";
import { sendOtp } from "../utils/sendOtp.js";
import {sendOtpController, verifyotpController } from "../controllers/otpController.js";
import passport from "passport";
import { googleCallback } from "../controllers/userController.js";
const router  = express.Router();

router.post("/send-otp" , sendOtpController)
router.post("/verify-otp",verifyotpController)
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:3000/login",
  }),
  googleCallback
);

export default router;