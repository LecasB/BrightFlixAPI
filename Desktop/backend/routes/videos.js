const express = require('express');
const router = express.Router();

// Importing videos controller methods

const {getVideos} = require('../controllers/videosController');

router.route('/videos').get(getVideos);   

module.exports = router;https://github.com/LecasB/BrightFlix.git