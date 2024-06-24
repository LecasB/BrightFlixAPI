const express = require("express");
const app = express();

const dotenv = require("dotenv");

const connectDatabase = require("./config/database");

//Setting up config.env file variables
dotenv.config({ path: "./config/config.env" });

//Connecting Database

connectDatabase();

//Setup body parser
app.use(express.json());

//Creating own middlware

const middlware = (req, res, next) => {
  req.developers = "Leonardo 😎 & Belo 😎";
  next();
};

app.use(middlware);

//Importing routes

const videos = require("./routes/videos");

app.use("/api/v1", videos);

const PORT = process.env.PORT;
const MODE = process.env.NODE_ENV;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} in ${MODE} mode.`);
});
