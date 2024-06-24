const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URI, {}).then((con) => {
    const db = mongoose.connection;
    console.log(`MongoDB connected with host: ${db.host}`);
    console.log(`MongoDB connected to cluster: ${db.client.s.url}`);
  });
};

module.exports = connectDatabase;
