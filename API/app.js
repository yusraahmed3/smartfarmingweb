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

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`Server running!`);
});

app.use("/images", express.static("images"));
