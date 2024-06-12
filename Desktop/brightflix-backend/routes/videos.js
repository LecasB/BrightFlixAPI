const express = require('express');
const router = express.Router();

router.get('/videos', (req,res) =>{
    res.status(200).json({
        sucess: true,
        message: 'This route will display all videos'
    })
})

const { getVideos } = require("../controllers/videosControl")

router.route('/videos').get(getVideos)

module.exports = router;