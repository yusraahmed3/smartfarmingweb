import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { credentials } from "../config/index.js";

const userRegister = async (userDets, role, res) => {
  // validate email
  try {
    let emailRegistered = await validateEmail(userDets.email);
    if (emailRegistered) {
      console.log("Email already registered");
      return res.status(400).end({
        message: "Email is already registered. Try logging in instead",
        success: false,
      });
    }

    const password = await bcrypt.hash(userDets.password, 12);

    const newUser = new User({
      photo: userDets.photo,
      phoneno: userDets.phoneno,
      company: userDets.company,
      email: userDets.email,
      name: userDets.firstName + " " + userDets.lastName,
      password,
      role,
    });
    console.log(newUser);
    await newUser.save();
  } catch (err) {
    console.log(err);
    res.send({ message: err.message });
  }
};

const userLogin = async (userCreds, role, res) => {
  console.log("login function");
  const { email, password } = userCreds;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "User doesn't exit. Please sign up", succes: false });

    // check if password matches hashed password in DB
    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      credentials.SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      email: user.email,
      id: user._id,
      role: user.role,
      name: user.name,
      company: user.company,
      phoneno: user.phoneno,
      photo: user.photo,
      token,
    });
  } catch (error) {
    res.status(500).json("Something went wrong!");
  }
};

const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? true : false;
};

export { userRegister, userLogin };
