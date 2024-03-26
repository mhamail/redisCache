import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB||"");
    console.log("Connection to database successful");
  } catch (error) {
    console.error("DB error:", error);
    throw new Error("Unable to connect to the database");
  }
};
