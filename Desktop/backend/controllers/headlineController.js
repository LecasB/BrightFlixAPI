const Headline = require("../models/headlines");

// Controller for getting a random headline
exports.GetHeadline = async (req, res) => {
  try {
    const headline = await Headline.aggregate([{ $sample: { size: 1 } }]);

    res.status(200).json(headline[0]); // Returns the first (and only) item from the random sample
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch headline",
      error: error.message,
    });
  }
};
