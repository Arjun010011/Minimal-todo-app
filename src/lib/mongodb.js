import mongoose from "mongoose";

const mongourl = process.env.MONGO_URI;

if (!mongourl) {
  throw new Error("mongodb connection string is missing");
}

async function connectDb() {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(mongourl);
    console.log("connected to mongodb");
  } catch (error) {
    console.error("error", error);
  }
}

export default connectDb;
