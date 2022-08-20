// const mongoose = require('mongoose')
import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "approved", "rejected"],
  },
  firstName: { type: String, required: true },
  lastName: String,
  phoneno: { type: String, required: true },
  company: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmpwd: { type: String, required: true },
  message: { type: String, required: true },
  photo: { type: String, required: true },
});

export default mongoose.model("Request", requestSchema);
