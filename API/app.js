const express = require('express');
const mongoose = require('mongoose')
const requestRoutes = require('./routes/requests')
const approvedRoutes = require('./routes/approvedrequests')
const rejectedRoutes = require('./routes/rejectedrequests')
const researcherRoutes = require('./routes/researchers')
const userRoutes = require('./routes/users')
const cors = require('cors')
//import usersRoutes from './routes/users.js';


const url = 'mongodb://localhost/SmartfarmingDB'

const app = express();

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true })

const con = mongoose.connection


con.on('open', function(){
    console.log("Connected!")
})

app.use(cors());
app.use(express.json())

app.use('/researcher', researcherRoutes)
app.use('/requests', requestRoutes)
app.use('/approved', approvedRoutes)
app.use('/rejected', rejectedRoutes)
app.use('/user', userRoutes)


app.get('/', (req, res) => {
    res.send("we are on home");
})



app.listen(4000)
