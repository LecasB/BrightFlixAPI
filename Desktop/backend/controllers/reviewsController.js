// Import the Reviews model
const Reviews = require("../models/reviews");

// Controller for getting reviews
exports.GetReviews = async (req, res) => {
  try {
    const reviews = await Reviews.find(); // Get all reviews
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};

// Controller for submitting a new review
exports.SubmitReview = async (req, res) => {
  try {
    const review = await Reviews.create(req.body); // Create a new review
    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to submit review",
      error: error.message,
    });
  }
};
