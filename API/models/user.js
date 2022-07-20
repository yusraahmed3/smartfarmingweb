import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
      trim: true,
      maxlength: 28,
    },
    company: {
      type: String,
    },
    phoneno: {
      type: String,
    },
    photo: {
      type: String,
      default: "http://localhost:4000/images/1657396580212--avatar.png",
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", User);
