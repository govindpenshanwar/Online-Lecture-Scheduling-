import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
export async function connect() {
    try {
        const mongoUri = process.env.MONGO_URI
        await mongoose.connect(mongoUri).then(() => {
            console.log("DB Connected");
        }).catch((e) => {
            console.error("Err connecting db => ", error.message);
        })

    } catch (error) {
        console.error("Err connecting db => ", error.message);
    }
}