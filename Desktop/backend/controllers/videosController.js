
// Get all Videos => /api/v1/videos

exports.getVideos = (req, res, next) => {
    res.status(200).json({
        success: true,
        message : 'This route will display all videos :3'
    });
}