const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const DB_URL_LOCAL = process.env.DB_URL_LOCAL;
const DB_URL = process.env.DB_URL;

// Connexion with database
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.log("Could not connect. Exiting now...", err);
    process.exit();
  });
