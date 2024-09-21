const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();
const MONGO_URI='mongodb+srv://abhijitsuryawanshi309:CHMmGnWBcxOLv8Y8@cluster0.a14tx.mongodb.net/'
const client = mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log("Error: ", error);

    return error;
  });

module.exports = client;
