var express = require('express');
var router = express.Router();
var Service = require('./service');

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/:movie_name', function(req, res) {
    var result = Service.Get_Movie_Id.search_movie(req.params.movie_name);

    console.log(result);
});

module.exports = router;