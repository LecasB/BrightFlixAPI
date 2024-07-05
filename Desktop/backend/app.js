const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require('path');
const connectDatabase = require("./config/database");
const errorMiddleware = require("./middlewares/errors");

const app = express();

// Setting up config.env file variables
dotenv.config({ path: "./config/config.env" });

// Define the CORS options
const allowedOrigins = [
  "http://localhost:3000",
  "https://bright-flix.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "HEAD", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // If you want to allow cookies or authorization headers
};

// Use the CORS middleware with options
app.use(cors(corsOptions));

// Preflight OPTIONS requests handling 
app.options('*', cors(corsOptions));

// Connecting Database
connectDatabase();

// Setup body parser
app.use(express.json());

// Setup cookie parser
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Creating own middleware
const middleware = (req, res, next) => {
  req.developers = "Leonardo 😎 & Belo 😎";
  next();
};
app.use(middleware);

// Importing routes
const videos = require("./routes/videos");
const auth = require("./routes/auth");
const series = require("./routes/series");

app.use("/api/v1", videos);
app.use("/api/v1", auth);
app.use("/api/v1", series);

// Middleware to handle errors
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set
const MODE = process.env.NODE_ENV || 'development'; // Default to 'development' if NODE_ENV is not set
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} in ${MODE} mode.`);
});
