import express from "express";
import multer from "multer";
import uuid from "uuidv4";
import {
  goToDashboard,
  signInUser,
  registerAdmin,
  registerUser,
  getUser,
  updateProfile,
  getAllUsers,
  upload,
} from "../controllers/users.js";
import auth from "../middlewares/passport.js";

const router = express.Router();

// User registration route
router.post("/register-user", upload.single("photo"), registerUser);

// Admin registration route
router.post("/register-admin", upload.single("photo"), registerAdmin);

// User login route
router.post("/login", signInUser);

router.get("/dashboard", auth, goToDashboard);

router.get("/", getAllUsers);

//get user
router.put("/profile", upload.single("photo"), auth, updateProfile);

export default router;
