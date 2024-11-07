const mongoose = require("mongoose");

const headlinesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    text: {
      type: String,
    },
    movie: {
      type: String,
    },
    movieId: {
      type: Number,
    },
    movieUrl: {
      type: String,
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

module.exports = mongoose.model("Headlines", headlinesSchema);
