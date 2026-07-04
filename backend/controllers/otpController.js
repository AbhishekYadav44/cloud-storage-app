import express from "express";
import { sendOtp } from "../utils/sendOtp.js";
import Otp from "../models/otpModel.js";

export async function sendOtpController(req,res) {
     
   

    const {email} = req.body;
     
    const data = await  sendOtp(email)

    res.json({
        message : "otp sent",
        data
    })
}

export async function verifyotpController(req,res) {
     
    const {email,otp} = req.body;

    const otpdata = await Otp.findOne({email,otp});
    if(!otpdata){
        return res.status(400).json({
           message  : "invalid otp "
        })
    }

    return res.json({
        message : "otp verified succesfully"
    })

}





