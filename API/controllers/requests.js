import Request from "../models/request.js";
import multer from "multer";
import { userRegister } from "../utils/Auth.js";
import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIR = "./images/";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, DIR);
//   },
//   filename: (req, file, cb) => {
//     //const fileName = file.originalname.toLowerCase().split(" ").join("-");
//     cb(null, Date.now() + "--" + file.originalname);
//   },
// // });

// // export const upload = multer({
// //   storage: storage,
// //   fileFilter: (req, file, cb) => {
// //     if (
// //       file.mimetype == "image/png" ||
// //       file.mimetype == "image/jpg" ||
// //       file.mimetype == "image/jpeg"
// //     ) {
// //       cb(null, true);
// //     } else {
// //       cb(null, false);
// //       return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
// //     }
// //   },
// // });

const emailTemplate = fs.readFileSync(
  path.join(__dirname, "/template.hbs"),
  "utf8"
);

const mailgunAuth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.DOMAIN_NAME,
  },
};

const smtpTransport = nodemailer.createTransport(mg(mailgunAuth));

const template = handlebars.compile(emailTemplate);

export const getRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not fetch requests. Please try again later." });
  }
};

export const sendRequest = async (req, res) => {
  console.log("Inside send function");
  const request = req.body;
  const existingRequest = await Request.findOne({ email: request.email });
  if (existingRequest)
    return res.status(400).json({
      message:
        "Your request is still pending. Please wait until we finish reviewing it.",
    });
  if (request.password !== request.confirmpwd)
    return res.status(400).json({ message: "Passwords don't match." });

  const newRequest = new Request({
    ...request,
    photo: req.file.location || request.photo,
  });

  try {
    await newRequest.save();
    res.status(201).json(newRequest);
    console.log("Post success");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
};

export const getRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    res.status(200).json(request);
    console.log("Found it");
  } catch (err) {
    console.log(err);
    res.send("Error");
  }
};

export const deleteRequest = async (req, res) => {
  try {
    const requestToDelete = await Request.findById(req.params.id);
    if (!requestToDelete)
      return res.status(404).json({ message: "Request not found." });
    await requestToDelete.delete();
    return res.status(200).json({ message: "Request deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later" });
  }
};

// change status to approved
export const approveRequest = async (req, res) => {
  const request = await Request.findById(req.params.id);
  try {
    if (!request) return res.status(404).json({ message: "Request not found" });
    await Request.findByIdAndUpdate(
      req.params.id,
      { $set: { status: "approved" } },
      { new: true },
      (err, request) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        } else {
          const htmlToSend = template({
            message:
              "Your request has been approved. You can login using the credentials you provided in the request",
          });
          const mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: request.email,
            subject: "Request Approved!",
            html: htmlToSend,
          };
          smtpTransport.sendMail(mailOptions, (err, res) => {
            if (err) {
              console.log("Not working");
            } else {
              console.log("Successfully sent email");
            }
          });
          userRegister(request, "user", res);
          console.log(request);
          return res
            .status(200)
            .json({ data: request, message: "Request approved!" });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

//change status to rejected
export const rejectRequest = async (req, res) => {
  const request = await Request.findById(req.params.id);
  try {
    if (!request)
      return res.status(404).json({ message: "Request not found!" });
    await Request.findByIdAndUpdate(
      req.params.id,
      { $set: { status: "rejected" } },
      { new: true },
      (err, request) => {
        if (err) {
          return res.status(500).json(err);
        } else {
          const htmlToSend = template({
            message:
              "Your request has been declined due to inadequate information. Thanks for applying.",
          });
          const mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: request.email,
            subject: "Request Declined!",
            html: htmlToSend,
          };
          smtpTransport.sendMail(mailOptions, (err, res) => {
            if (err) {
              console.log("Not working");
            } else {
              console.log("Successfully sent email");
            }
          });
          console.log(request);
          return res
            .status(200)
            .json({ data: request, message: "Request rejected!" });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};
