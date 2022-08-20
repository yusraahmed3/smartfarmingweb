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
      default:
        "https://smartfarming-app.s3.ap-south-1.amazonaws.com/1661033564682--avatar.png",
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
