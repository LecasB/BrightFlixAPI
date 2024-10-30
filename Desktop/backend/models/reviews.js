const mongoose = require("mongoose");
const validator = require("validator");

const reviewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter your name"],
    },
    text: {
      type: String,
      required: [true, "Please enter your review"],
      minlength: [20, "Your password must be alteast 20 characters long"],
    },

    movie: {
      type: String,
      required: [true, "Please enter your movie"],
    },
    movieId: {
      type: Number,
      required: [true],
    },

    email: {
      type: String,
      required: [true, "Please enter your email"],
      minlength: [8, "Your password must be alteast 8 characters long"],
      validate: [validator.isEmail, "Please enter valid email"],
    },
    rating: {
      type: Number,
      required: [true, "Please enter your rating"],
    },
    first_name: {
      type: String,
      required: [true, "Please enter your First Name"],
    },
    last_name: {
      type: String,
      required: [true, "Please enter your Last Name"],
    },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("Reviews", reviewsSchema);
