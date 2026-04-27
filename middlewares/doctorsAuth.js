import jwt from "jsonwebtoken";
import Doctor from "../models/Doctor.js";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function doctorsAuth(req, res, next) {
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({success: false,message:"Unauthorized"});
    }

    const token=authHeader.split(" ")[1];
    try {
        const payload=jwt.verify(token, JWT_SECRET);
        if(payload.role && payload.role !== "doctor") {
            return res.status(401).json({success: false,message:"Unauthorized"});
        }
        const doctor=await Doctor.findById(payload.id).select("-password");
        if(!doctor) {
            return res.status(401).json({success: false,message:"Unauthorized"});
        }

        req.doctor=doctor;
        next();
    }
        catch (error) {
        console.error("Error in doctorsAuth middleware:", error);
        return res.status(401).json({success: false,message:"Unauthorized"});
        }
}
