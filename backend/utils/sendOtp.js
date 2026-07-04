import Otp from "../models/otpModel.js";
import nodemailer from "nodemailer"
import dotenv from 'dotenv'
dotenv.config()


export async function sendOtp(email) {

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    await Otp.findOneAndUpdate(
        { email },
        { otp, createdAt: Date.now() },
        { upsert: true }
    )

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER,
            pass: process.env.USER_PASS,
        },
    });

    const html = `
  <div style="font-family: Arial, sans-serif;">
    <h2>Cloudy Email Verification</h2>
    <p>Your OTP is:</p>
    <h1 style="color:#2563eb;">${otp}</h1>
    <p>This OTP is valid for 5 minutes. Do not share it with anyone.</p>
  </div>
`;


    try {
        const info = await transporter.sendMail({
            from: `"Cloudy" <${process.env.USER}>`, 
            to: email,
            subject: "Verify your Email ",
            html
        });

        console.log("Message sent: %s", info.messageId);
        return { success: true, message: `otp sent succesfully to ${email}`}
    } catch (err) {
        console.error("Error while sending mail:", err);
        return {
            success: false,
            message: "Failed to send OTP",
        };
    }


}