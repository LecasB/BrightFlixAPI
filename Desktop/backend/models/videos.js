const mongoose = require("mongoose");
const validator = require("validator");
const slugify = require("slugify");

const formatDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter Video Title"],
      maxlength: [1000, "Video title can not exceed 100 characters"],
    },

    slug: String,

    description: {
      type: String,
      required: [true, "Please enter video description"],
      maxlength: [1000, "Description can not exceed 200 characters"],
    },

    category: {
      type: String,
      required: [true, "Please enter video's category"],
      maxlength: [150, "Description can not exceed 15 characters"],
    },

    creator: {
      type: String,
      required: [true, "Please enter the creators name"],
      maxlength: [150, "Name can not exceed 15  characters"],
    },

    email: {
      type: String,
      validate: [validator.isEmail, "Please add a valid email address"],
      select: false,
    },

    created: {
      type: String,
      default: formatDate,
    },

    duration: {
      type: Number,
      required: [true, "Please enter the duration"],
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
      required: [true, "Please enter the thumbnail"],
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

// Creating Job Slug before saving

videoSchema.pre("save", function (next) {
  //Creating slug before saving for db
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model("Video", videoSchema);
