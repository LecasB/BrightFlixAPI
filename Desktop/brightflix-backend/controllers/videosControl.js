const Video = require('../models/videoModel');

exports.getVideos = async (req, res, next) => {
  try {
    const videos = await Video.find();
    res.status(200).json({
      success: true,
      message: 'This route will display all videos',
      data: videos
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error retrieving videos"
    });
  }
}