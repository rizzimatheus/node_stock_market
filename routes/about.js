var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
    res.render('about', {
        title: 'About Me!',
        description: "This is my first node program!!!",
    });
});

module.exports = router;
