const express = require('express')
const Rejects = require('../models/rejectedrequest.js')

const router = express.Router()

router.get('/', async(req,res)=>{
    try{
        const requests = await Rejects.find()
        res.json(requests)
    }catch(err){
        res.send('Error' , + err)
    }
})


router.post('/', async(req, res)=>{
    const request = new Rejects({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phoneno: req.body.phoneno,
        instname: req.body.instname,
        email: req.body.email,
        password: req.body.password,
        message: req.body.message,
        idimg: req.body.idimg,
        status: req.body.status
    })
    try{
        const a1 = await request.save()
        res.json(a1)
        console.log("Post success")
    }catch(err){
        console.log(err)
        res.send('Error')
    }
})

router.patch("/status/:id", async (req, res) => {
    console.log("Inside change status");
    try {
      const reject = await Rejects.findByIdAndUpdate(
        req.params.id,
        { $set: { status: req.body.status } },
        { new: true }
      );
      res.json(reject);
    } catch (err) {
      console.log(err);
    }
  });


router.get("/:id", async(req, res) =>{
    try{
        const request = await Rejects.findById(req.params.id)
        res.json(request)
        console.log("Found it")
    }
    catch(err){
        console.log(err)
        res.send("Error")
    }
})

router.patch("/:id", async(req, res) =>{
    try{
        const request = await Rejects.findById(req.params.id)
        request.password = req.body.password
        const a2 = await request.save()
        res.json(a2)
    }catch(err){
        console.log(err)
        res.send("error")
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const request = await Rejects.findById(req.params.id)
        const a3 = await request.delete()
        res.json(a3)

    }catch(err){
        console.log(err)
        res.json("error")
    }
})
module.exports = router