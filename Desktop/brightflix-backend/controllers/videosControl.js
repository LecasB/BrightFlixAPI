exports.getVideos = (req, res, next) => {
    res.status(200).json({
        sucess: true,
        message: 'This route will display all Videos'
    })
}