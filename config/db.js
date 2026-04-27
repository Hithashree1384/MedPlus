import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://hithashree1384_db_user:GbnkJmqavTRwiuTo@cluster0.pjgthoa.mongodb.net/Medicare").
    then(() => {
        console.log("Connected to MongoDB")
    })}