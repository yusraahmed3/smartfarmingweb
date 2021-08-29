const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require('../config')
const passport = require('passport')

const userRegister = async (userDets, role, res) => {
  try {
    let emailNotRegistered = await validateEmail(userDets.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: "Email already registered. Try logging in instead",
        success: false,
      });
    }
    const password = await bcrypt.hash(userDets.password, 12);

    const newUser = new User({
      ...userDets,
      password,
      role,
    });
    await newUser.save();
    return res.status(201).json({
      message: "User registered!",
      success: true,
    });
  } catch (err) {
    return res.status(201).json({
      message: "User registeration failed!",
      success: true,
    });
  }
};

const userLogin = async (userCreds, role, res) => {
  console.log("Auth user")
  let { email, password } = userCreds;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "Email/Password combination incorrect!",
      succes: false,
    });
  }

  if(user.role != role){
      return res.status(403).json({
          message: "Wrong portal",
          success: false
      })
  }

  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    let token = jwt.sign({
      user_id: user._id,
      role: user.role,
      email: user.email,
    }, SECRET, { expiresIn: "7 days"});

    let result = {
        email: user.email,
        role: user.role,
        token: `Bearer ${token}`,
        expiresIn: 168
    };

    return res.status(200).json({
        ...result,
        message: "You are logged in!",
        success: true
    });

  } else {
    return res.status(403).json({
      message: "Email/Password Combination incorrect!",
      succes: false,
    });
  }
};

const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

const userAuth = passport.authenticate("jwt", { session: false })

module.exports = { userRegister, userLogin, userAuth };
