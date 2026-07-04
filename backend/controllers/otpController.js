import express from "express";
import { sendOtp } from "../utils/sendOtp.js";

export async function send_Otp(req,res) {
     
   

    const {email} = req.body;
     
    const data = await  sendOtp(email)

    res.json({
        message : "otp sent",
        data
    })
}





