const express = require("express");
const cors = require("cors");
const app = express();

const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const connectDatabase = require("./config/database");
const errorMiddleware = require("./middlewares/errors");

//Setting up config.env file variables
dotenv.config({ path: "./config/config.env" });

//define the CORS options

const allowedOrigins = [
  "http://localhost:3000",
  "https://bright-flix.vercel.app",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Não permitido por CORS"));
    }
  },
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Use the CORS middleware with options
app.use(cors(corsOptions));

//Connecting Database

connectDatabase();

//Setup body parser
app.use(express.json());

//Ser cookie parser
app.use(cookieParser());

//Creating own middlware

const middlware = (req, res, next) => {
  req.developers = "Leonardo 😎 & Belo 😎";
  next();
};

app.use(middlware);

//Importing routes

const videos = require("./routes/videos");
const auth = require("./routes/auth");

app.use("/api/v1", videos);
app.use("/api/v1", auth);

//Middleware to handle errors

app.use(errorMiddleware);

const PORT = process.env.PORT;
const MODE = process.env.NODE_ENV;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} in ${MODE} mode.`);
});
