const express = require("express");
const {
  GetReviews,
  SubmitReview,
  DeleteReviewById,
  GetReviewById,
} = require("../controllers/reviewsController");

const router = express.Router();

router.route("/GetReviews").get(GetReviews);
router.route("/SubmitReview").post(SubmitReview);
router.route("/GetReviewById").get(GetReviewById);
router.route("/DeleteReviewById").delete(DeleteReviewById);

module.exports = router;
