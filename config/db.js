const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoDB = process.env.MONGODB_URI;
    await mongoose.connect(mongoDB);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
