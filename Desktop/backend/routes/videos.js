const express = require("express");
const router = express.Router();

// Importing videos controller methods

const {
  getVideos,
  newVideo,
  updateVideo,
  deleteVideo,
  getVideoById,
} = require("../controllers/videosController");

router.route("/videos").get(getVideos);

router.route("/videos/:id").get(getVideoById);

router.route("/videos/new").post(newVideo);

router.route("/videos/update/:id").put(updateVideo);

router.route("/videos/delete/:id").delete(deleteVideo);

module.exports = router;
