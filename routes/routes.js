const express = require('express')
const Contact = require('../controller/contact/post')
const Home = require('../controller/home/get')

const router = express.Router()

/////// Global routers /////// 
// Home route
router.route('/').get(Home.getHome); // Get home
// Contact route
router.route('/contact').post(Contact.postContact); // Post contact

module.exports = router