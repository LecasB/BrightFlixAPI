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
      type: [
        {
          number: {
            type: Number,
          },
          episodes: {
            type: [
              {
                title: {
                  type: String,
                },

                link: {
                  type: String,
                },
              },
            ],
          },
        },
      ],
    },

    cast: {
      type: [String],
    },

    rating: {
      type: Number,
    },

    thumb: {
      type: String,
    },

    video: {
      type: String,
    },

    banner: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id; // Remove _id field from the document
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("Serie", serieSchema);
