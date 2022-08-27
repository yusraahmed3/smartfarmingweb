import User from "../models/user.js";
import { userRegister, userLogin } from "../utils/Auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";
import { credentials } from "../config/index.js";
import multerS3 from "multer-s3-v2";
import aws from "aws-sdk";

aws.config.update({
  secretAccessKey: process.env.PRIVATE_AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.PRIVATE_AWS_ACCESS_KEY,
  region: process.env.PRIVATE_AWS_DEFAULT_REGION,
});

var s3 = new aws.S3({
  /*...*/
});

let storage = multerS3({
  s3: s3,
  bucket: process.env.PRIVATE_AWS_BUCKET,
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata(req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key(req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

export const upload = multer({
  storage: storage,
});

sgMail.setApiKey(credentials.SGSECRET);
const DIR = "./images/";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, DIR);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "--" + file.originalname);
//   },
// });

// export const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype == "image/png" ||
//       file.mimetype == "image/jpg" ||
//       file.mimetype == "image/jpeg"
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
//     }
//   },
// });

const emailData = (recipient, name, template) => {
  let msg = null;
  switch (template) {
    case "Approved":
      msg = {
        from: "yusraa190@gmail.com",
        to: recipient,
        subject: "Request Approved",
        text: "Your request has been approved. Please log in using the credentials you provided in your request.",
      };
      break;
    case "Rejected":
      msg = {
        from: "yusraa190@gmail.com",
        to: recipient,
        subject: `Dear ${name}`,
        text: "Your request has been rejected due to inadequate information. Please send again.",
      };
      break;
    case "Revoke":
      msg = {
        from: "yusraa190@gmail.com",
        to: recipient,
        subject: `Dear ${name}`,
        text: "Your request has been revoked due to inactivity",
      };
    default:
      msg;
  }
  return msg;
};

const sendEmail = (to, uname, type) => {
  const msg = emailData(to, uname, type);
  sgMail
    .send(msg)
    .then((msg) => console.log(msg))
    .catch((err) => console.log(err));
};

export const registerUser = async (req, res) => {
  await userRegister(req, "user", res);
};

export const registerAdmin = async (req, res) => {
  await userRegister(req.body, "admin", res);
};

export const signInUser = async (req, res) => {
  await userLogin(req.body, "user", res);
};

export const goToDashboard = async (req, res) => {
  console.log("Inside dashboard");
  await res.json(req.user);
};

export const getAllUsers = async (req, res) => {
  console.log("Inside get all users");
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "No users found" });
  }
};

export const getUser = async (req, res) => {
  console.log("get user");
  try {
    console.log(req.userId);
    const user = await User.findById(req.userId);
    if (!user) {
      return res.json({ message: "user doesn't exist" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

export const updateProfile = async (req, res) => {
  console.log("Inside update");
  const user = await User.findById(req.userId);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phoneno = req.body.phoneno || user.phoneno;
    user.company = req.body.company || user.company;

    // console.log(req.file);
    // // user.photo = url + "/images/" + req.file.filename || user.photo;
    // console.log(req);
    // console.log(req.file.filename);

    if (typeof req.file !== "undefined") {
      user.photo = req.file.location;
    } else {
      user.photo = user.photo;
    }

    if (req.body.password) {
      const password = await bcrypt.hash(req.body.password, 12);
      user.password = password;
    }
    const token = jwt.sign({ id: user._id }, credentials.SECRET, {
      expiresIn: "1h",
    });
    const updatedUser = await user.save();
    res.status(200).json({
      email: updatedUser.email,
      id: updatedUser._id,
      role: updatedUser.role,
      name: updatedUser.name,
      company: updatedUser.company,
      phoneno: updatedUser.phoneno,
      photo: updatedUser.photo,
      token,
    });
  } else {
    res.status(404).json({ message: "User doesn't exist" });
  }
};

export const approvedEmail = async (req, res) => {
  const { email, name } = req.body;
  sendEmail(email, name, "Approved");
  res.send("Success");
};

export const declinedEmail = async (req, res) => {
  const { email, name } = req.body;
  sendEmail(email, name, "Rejected");
  res.send("Success");
};
