var express = require('express');
var router = express.Router()

// First message
router.get('/', (req, res) => {
    res.send('Anas Masti portfolio back-end is runing.. :)');
})

module.exports = router;