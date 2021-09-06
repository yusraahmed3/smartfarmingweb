const express = require("express");
const User = require("../models/user.js");
const { userRegister, userLogin, userAuth } = require("../utils/Auth");
const multer = require("multer");
const uuid = require("uuid").v4;
const router = express.Router();
const auth = require("../middlewares/passport");

const DIR = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuid() + "-" + fileName);
  },
});

var upload = multer({
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


router.get('/protected', auth, (req, res)=>{
  res.status(200).json({
    msg: "Authorized"
  })
})

router.get("/", async (req, res) => {
  try {
    const result = await User.find();
    res.json(result);
  } catch (err) {
    res.send("Error", +err);
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
    console.log("User found");
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  console.log("Inside login");
  await userLogin(req.body, "user", res);
  //  const user = await User.findOne({ email: req.body.email }, (err, result) => {
  //     if (err) res.status(500).json({ msg: err });
  //     if (result == null) {
  //         res.status(403).json("username or password incorrect");
  //     }
  //     else if (result.password == req.body.password) {
  //         res.status(200).send({
  //             message: "Login successful"
  //         })
  //     }
  //     else {
  //         res.status(403).send("password is incorrect");
  //     }
  // });
});

// router.post("/admin-login", async (req, res) => {
//   await userLogin(req.body, "admin", res);
// });

router.post("/register", async (req, res) => {
  console.log("Inside the register");
  await userRegister(req, "user", res);
  // const user = new User({
  //     email: req.body.email,
  //     password: req.body.password,

  // });
  //  user
  //     .save()
  //     .then(() => {
  //         console.log("user registered");
  //         res.status(200).json(user);
  //     })
  //     .catch((err) => {
  //         res.status(403).json({ msg: err });
  //     });
});

router.patch("/updatename/:id", async (req, res) => {
  console.log("Inside change name method");
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { name: req.body.name } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.patch("/updatephone/:id", async (req, res) => {
  console.log("Inside change phone number method");
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { phoneno: req.body.phoneno } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.patch("/updateemail/:id", async (req, res) => {
  console.log("Inside change email method");
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { email: req.body.email } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.patch("/photo/:id", upload.single("idimg"), async (req, res, err) => {
  console.log("Inside photo update")
  try {
    const id = req.params.id;
    const url = req.protocol + "://" + req.get("host");
    const updatedImg = url + "/public/" + req.file.filename;
    const upImage = await User.findByIdAndUpdate(
      id,
      { $set: { idimg: updatedImg } },
      { new: true }
    );
    return res.json(upImage);
  } catch (err) {
    console.log(err);
  }
});

// router.post("/admin-register", upload.single('idimg'), async (req, res) => {
//   const url = req.protocol + '://' + req.get('host')
//   console.log("Inside admin register");
//   await userRegister(req, "admin", res);
// });

module.exports = router;
