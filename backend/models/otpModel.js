import mongoose, { mongo } from "mongoose";

const otpSchema = new mongoose.Schema({
    email : {
        type : String,
        required :true,
        unique : true
    },
    otp : {
        type : String,
        required  :true
    },
    createdAt : {
       type : Date,
       default : Date.now,
       expires : 600  // 600 sec = 10 min
    }
})

const Otp = mongoose.model("Otp" , otpSchema)

export default Otp;