const express = require("express");
const router = express.Router();

// Importing videos controller methods

const {
  getVideos,
  newVideo,
  updateVideo,
  deleteVideo,
} = require("../controllers/videosController");

router.route("/videos").get(getVideos);

router.route("/videos/new").post(newVideo);

router.route("/videos/:id").put(updateVideo);

router.route("/videos/:id").delete(deleteVideo);

module.exports = router;
