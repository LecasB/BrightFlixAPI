// Import the Reviews model
const Reviews = require("../models/reviews");

// Controller for getting reviews
exports.GetReviews = async (req, res) => {
  try {
    const reviews = await Reviews.find(); // Get all reviews

    // Updated response to send only the array of reviews
    res.status(200).json(reviews);
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

exports.GetReviewById = async (req, res) => {
  const { id } = req.query;

  console.log("Received movieId (as id):", id);

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "id query parameter is required",
    });
  }

  try {
    const reviews = await Reviews.find({ movieId: id });

    if (reviews.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No reviews found for the specified movie ID",
      });
    }

    res.status(200).json(reviews);
  } catch (error) {
    // Debugging: Log the error
    console.error("Error fetching review:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};

// Controller for deleting a review by ID (now using query parameter)
exports.DeleteReviewById = async (req, res) => {
  const { id } = req.query; // Use req.query to get the ID

  try {
    const review = await Reviews.findByIdAndDelete(id); // Delete review by ID

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete review",
      error: error.message,
    });
  }
};
