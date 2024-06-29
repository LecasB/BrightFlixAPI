const mongoose = require("mongoose");
const validator = require("validator");

const formatDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const serieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter Serie Title"],
      maxlength: [1000, "Serie title can not exceed 1000 characters"],
    },

    description: {
      type: String,
      required: [true, "Please enter serie description"],
      maxlength: [1000, "Description can not exceed 1000 characters"],
    },

    category: {
      type: String,
      required: [true, "Please enter serie's category"],
      maxlength: [150, "Category can not exceed 150 characters"],
    },

    creator: {
      type: String,
      required: [true, "Please enter the creator's name"],
      maxlength: [150, "Name can not exceed 150 characters"],
    },

    created: {
      type: String,
      default: formatDate,
    },

    seasons: {
      type: Number,
      required: [true, "Please enter the number of seasons"],
    },

    episodes: {
      type: Number,
      required: [true, "Please enter the number of episodes"],
    },

    cast: {
      type: [String],
      required: [true, "Please enter the cast members"],
    },

    rating: {
      type: Number,
      required: [true, "Please enter the rating"],
    },

    thumb: {
      type: String,
      required: [true, "Please enter the thumbnail"],
    },

    video: {
      type: String,
      required: [true, "Please enter the video link"],
    },

    banner: {
      type: String,
      required: [true, "Please enter the banner"],
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

module.exports = mongoose.model("Serie", serieSchema);
