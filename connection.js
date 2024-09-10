const mongoose = require("mongoose");

async function connectDb(urlencoded) {
  try {
    await mongoose.connect(urlencoded);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    // You might want to rethrow the error or handle it appropriately
    throw err;
  }
}

module.exports = {
  connectDb,
};
