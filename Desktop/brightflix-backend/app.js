const express = require('express');
const app = express();

const dotenv = require('dotenv');

dotenv.config({path : './config/config.env'})


const login = require('./routes/login');
const videos = require('./routes/videos');

app.use(login);
app.use(videos);

const PORT = process.env.PORT;
const MODE = process.env.NODE_ENV
app.listen(PORT, () => {
    console.log(`Server Started on Port: ${PORT} in ${MODE} mode`);
})