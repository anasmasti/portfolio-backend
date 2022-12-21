const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const dotenv = require("dotenv");
const routes = require("./src/api/routes/routes.js");
const DB_CONFIG = require("./src/config/db/db.config");
const checkApiKey = require("./src/api/middleware/check-apikey");

// main affectations
const app = express();
const server = http.createServer(app);

// lunsh .env file
dotenv.config();

// global variables
const PORT = process.env.PORT || 8080;

// setup body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// config for Cors
app.use(
  cors({
    origin: "https://anasmasti.com",
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders:
      "Content-Type, X-Requested-With, Accept, Origin, Authorization, Api-Key-Access",
  })
);

//database connection
DB_CONFIG;

// Global route config
app.use("/api/v1", checkApiKey, routes); // main

//run the server
server.listen(
  PORT,
  console.log(`Application listening on http://localhost:${PORT}`)
);
