import Request from "../models/request.js";
import multer from "multer";
import uuid from "uuidv4";
import { userRegister } from "../utils/Auth.js";

const DIR = "./images/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    //const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "--" + file.originalname);
  },
});

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

export const getRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (err) {
    res.send("Error", +err);
  }
};

export const sendRequest = async (req, res) => {
  console.log("Inside send function");
  const url = req.protocol + "://" + req.get("host");
  const request = req.body;
  const existingRequest = await Request.findOne({ email: request.email });
  if (existingRequest && existingRequest.status === "pending")
    return res.status(400).json({
      message:
        "Your request is still pending. Please wait until we finish reviewing it.",
    });
  if (request.password !== request.confirmpwd)
    return res.status(400).json({ message: "Passwords don't match" });

  const newRequest = new Request({
    ...request,
    photo: url + "/images/" + req.file.filename,
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
      return res.status(404).json({ message: "Request not found" });
    await requestToDelete.delete();
    return res.status(200).json({ message: "Request deleted successfully" });
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
          return res.status(500).json(err);
        } else {
          userRegister(request, "user", res);
          return res
            .status(200)
            .json({ data: request, message: "Request approved" });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//change status to rejected
export const rejectRequest = async (req, res) => {
  const request = await Request.findById(req.params.id);
  try {
    if (!request) return res.status(404).json({ message: "Request not found" });
    await Request.findByIdAndUpdate(
      req.params.id,
      { $set: { status: "rejected" } },
      { new: true },
      (err, request) => {
        if (err) {
          return res.status(500).json(err);
        } else {
          return res
            .status(200)
            .json({ data: request, message: "Request rejected" });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
