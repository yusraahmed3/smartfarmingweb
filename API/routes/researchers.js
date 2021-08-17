// const express = require('express');

// const router = express.Router();

// router.get('/', (req, res) => {
//     res.send('Hello');
// });

// export default router;

const express = require('express')
const Researcher = require('../models/Researcher')

const router = express.Router()

router.get('/', async(req,res)=>{
    try{
        const researcher = await Researcher.find()
        res.json(researcher)
    }catch(err){
        res.send('Error' , + err)
    }
})


router.post('/', async(req, res)=>{
    const researcher = new Researcher({
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
        const a1 = await researcher.save()
        res.json(a1)
        console.log("Post success")
    }catch(err){
        console.log(err)
        res.send('Error')
    }
})

router.get("/:id", async(req, res) =>{
    try{
        const researcher = await Researcher.findById(req.params.id)
        res.json(researcher)
        console.log("Found it")
    }
    catch(err){
        console.log(err)
        res.send("Error")
    }
})

router.patch("/:id", async(req, res) =>{
    try{
        const researcher = await Researcher.findById(req.params.id)
        researcher.password = req.body.password
        const a2 = await researcher.save()
        res.json(a2)
    }catch(err){
        console.log(err)
        res.send("error")
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const researcher = await Researcher.findById(req.params.id)
        const a3 = await researcher.delete()
        res.json(a3)

    }catch(err){
        console.log(err)
        res.json("error")
    }
})
module.exports = router