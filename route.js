var express = require('express');
var router = express.Router();
var movie = require('./controllers/movie');

router.get('/', function(req, res) {
    
    if (req.query['movie_name']) {
        movie.searchCodeByName(req,res);
    } else {
        res.render('index');
    }
});

router.get('/movie_id/:movie_code', function(req, res) {
    console.log(req.params.movie_code);
    movie.searchCommentsById(req, res);
});

module.exports = router;