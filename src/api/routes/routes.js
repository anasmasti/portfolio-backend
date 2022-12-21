const express = require("express");
const postContact = require("../controllers/contact/post");
const getHome = require("../controllers/home/get");
const getResume = require("../controllers/resume/get");

const router = express.Router();

// Global routers
// Home route
router.route("/").get(getHome.getHome); // Get home
// Contact route
router.route("/contact").post(postContact.postContact); // Post contact
// Resume route
router.route("/resume").get(getResume.getResume);

module.exports = router;
