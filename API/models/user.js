const mongoose = require("mongoose");


const User = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    phoneno: {
        type: String,
        required: true
    },
    idimg: {
        type: String,
        default: "http://localhost:4000/public/18d9c3cf-8b2a-4cc2-8169-27ac364cb30d-avatar.png"
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    }
   
});

module.exports = mongoose.model("User", User);