const express = require('express');
const router = express.Router();

const { getVideos } = require("../controllers/videosControl")

router.route('/videos').get(getVideos)

module.exports = router;