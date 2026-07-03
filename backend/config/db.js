  
import dotenv from 'dotenv'
dotenv.config()
 import mongoose from "mongoose";

export async function connectDB() {
  const dburl = process.env.DB_URL
  try {
    await mongoose.connect(
      dburl
    );

    console.log("Database connected");
  } catch (err) {
    console.log(err);
    console.log("Could Not Connect to the Database");
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  await mongoose.disconnect();
  console.log("Database Disconnected!");
  process.exit(0);
});
