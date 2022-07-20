import express from "express";
import mongoose from "mongoose";
const app = express();

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/users.js";
import requestRoutes from "./routes/requests.js";
import channelRoutes from "./routes/channel.js";
import dotenv from "dotenv";
import passportConfig from "./middlewares/passport.js";
import passport from "passport";

dotenv.config();

app.use(bodyParser.json());

app.use(cookieParser());

app.use(cors());

app.use(passport.initialize());

passportConfig(passport);

// const requestRoutes = require('./routes/requests')
// const approvedRoutes = require('./routes/approvedrequests')
// const rejectedRoutes = require('./routes/rejectedrequests')
// const researcherRoutes = require('./routes/researchers')

// const passport = require('passport')
// const { DB, PORT } = require('./config');
// const channelRoute = require('./routes/channel');

// DB connection
mongoose
  .connect(process.env.APP_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch(() => console.log("Connection Error"));

app.use("/users", userRoutes);
app.use("/requests", requestRoutes);
app.use("/channel", channelRoutes);

const port = process.env.APP_PORT || 7000;

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
// mongoose.set('useFindAndModify', false);
// mongoose.connect("mongodb://127.0.0.1:27017/SmartfarmingDB", {useNewUrlParser: true, useUnifiedTopology: true })

// const con = mongoose.connection

// con.on('open', function(){
//     console.log("DB connected!")
// })

// app.use(cors());
// app.use(express.json())
// app.use(passport.initialize());

// //require('./middlewares/passport')(passport);

app.use("/images", express.static("images"));
// app.use('/researcher', researcherRoutes)
// app.use('/requests', requestRoutes)
// app.use('/approved', approvedRoutes)
// app.use('/rejected', rejectedRoutes)

// app.use('/channel',channelRoute)

// app.get('/', (req, res) => {
//     res.send("we are on home");
// })

// app.listen(PORT,function(){
//     console.log("Server running")
// } )
// // app.listen(PORT)
