const express = require("express");
const User = require("../models/user.js");

const router = express.Router();


router.get('/', async(req,res)=>{
    try{
        const result = await User.find()
        res.json(result)
    }catch(err){
        res.send('Error' , + err)
    }
})

router.post('/login', async (req,res)=>{
    console.log("Inside login");
     const user = await User.findOne({ email: req.body.email }, (err, result) => {
        if (err) res.status(500).json({ msg: err });
        if (result == null) {
            res.status(403).json("username or password incorrect");
        }
        else if (result.password == req.body.password) {
            res.status(200).send({
                message: "Login successful"
            })
        }
        else {
            res.status(403).send("password is incorrect");
        }
    });
})

router.post('/register', (req, res) =>{
    console.log("Inside the register");
    const user = new User({
        email: req.body.email,
        password: req.body.password,

    });
     user
        .save()
        .then(() => {
            console.log("user registered");
            res.status(200).json(user);
        })
        .catch((err) => {
            res.status(403).json({ msg: err });
        });

})

module.exports = router