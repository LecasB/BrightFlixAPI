const express = require("express");
const {
  GetReviews,
  SubmitReview,
} = require("../controllers/reviewsController");

const router = express.Router();

router.route("/GetReviews").get(GetReviews);
router.route("/SubmitReview").post(SubmitReview);

module.exports = router;
