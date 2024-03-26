import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "User Name is missing"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    phone: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
