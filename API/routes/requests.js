const express = require('express')
const Request = require('../models/request.js')

const router = express.Router()

router.get('/', async(req,res)=>{
    try{
        const requests = await Request.find()
        res.json(requests)
    }catch(err){
        res.send('Error' , + err)
    }
})




router.post('/', async(req, res)=>{
    const request = new Request({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phoneno: req.body.phoneno,
        instname: req.body.instname,
        email: req.body.email,
        password: req.body.password,
        message: req.body.message,
        idimg: req.body.idimg,
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

router.get("/:id", async(req, res) =>{
    try{
        const request = await Request.findById(req.params.id)
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
        const request = await Request.findById(req.params.id)
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
        const request = await Request.findById(req.params.id)
        const a3 = await request.delete()
        res.json(a3)

    }catch(err){
        console.log(err)
        res.json("error")
    }
})
module.exports = router