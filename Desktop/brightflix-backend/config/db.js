const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error(err);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;