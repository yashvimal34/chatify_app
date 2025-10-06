import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
    try {
        const { MONGO_URI } = ENV;
        if (!MONGO_URI) throw new Error("MONGO_URI is not set")

        const conn = await mongoose.connect(ENV.MONGO_URI)
        console.log("MongoDB Connected:", conn.connection.host)
    }
    catch (error) {
        console.error("Error in connection", error)
        process.exit(1)  // 1 is status code which means failed and, 0 means success.
    }
}