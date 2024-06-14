const express = require('express');
const app = express();

const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const login = require('./routes/login');
const videos = require('./routes/videos');
const db = require("./config/db");

try {
  db();
} catch (err) {
  console.error(err);
}

app.use(express.json());

app.use(login);
app.use(videos);

const PORT = process.env.PORT;
const MODE = process.env.NODE_ENV

app.get('*', function(req, res){
  res.status(404).json({
    success: "false",
    message: "Oops, this page does not exist!"
  });
});

app.listen(PORT, () => {
  console.log(`Server Started on Port: ${PORT} in ${MODE} mode`);
});