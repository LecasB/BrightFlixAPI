const Video = require("../models/videos");
const ErrorHandler = require("../util/errorHandler");
const APIFilters = require("../util/apiFilters");

// Get all Videos => /api/v1/videos

exports.getVideos = async (req, res, next) => {
  const apiFilters = new APIFilters(Video.find(), req.query);
  apiFilters.filter();
  apiFilters.sort();
  const videos = await apiFilters.query;

  res.status(200).json({
    developers: req.developers,
    success: true,
    results: videos.length,
    data: videos,
  });
};

//New Video => /api/v1/videos/new

exports.newVideo = async (req, res, next) => {
  const video = await Video.create(req.body);

  res.status(200).json({
    sucess: true,
    message: "Video Created",
    data: video,
  });
};

//Get a single job with id and slug  => /api/v1/videos/:id

exports.getVideoById = async (req, res, next) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    return res.status(404).json({
      sucess: false,
      message: "Video not found",
    });
  }

  res.status(200).json({
    sucess: true,
    data: video,
  });
};

// Update a Video => /api/v1/video/:id
exports.updateVideo = async (req, res, next) => {
  let video = await Video.findById(req.params.id);

  if (!video) {
    return next(new ErrorHandler("Video not found", 404));
  }

  video = await Video.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    sucess: true,
    message: "Video is updated",
    data: video,
  });
};
//naoseimesmo
//Delete video => /api/v1/video/:id
exports.deleteVideo = async (req, res, next) => {
  let video = await Video.findById(req.params.id);

  if (!video) {
    return res.status(404).json({
      sucess: false,
      message: "Video not found",
    });
  }

  video = await Video.findByIdAndDelete(req.params.id);

  res.status(200).json({
    sucess: true,
    message: "Video is Deleted",
  });
};
