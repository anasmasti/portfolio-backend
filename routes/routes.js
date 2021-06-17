const express = require('express')
const postContact = require('../controller/contact/post')
const getHome = require('../controller/home/get')
const getResume = require('../controller/resume/get')

const router = express.Router()

/////// Global routers /////// 
// Home route
router.route('/').get(getHome.getHome); // Get home
// Contact route
router.route('/contact').post(postContact.postContact); // Post contact
// Resume route
router.route('/resume').get(getResume.getResume)

module.exports = router