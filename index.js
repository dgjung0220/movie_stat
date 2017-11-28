var mongoose = require('mongoose');
var Models = require('./models');
var configs = require('./configs.js');

var movie_crawling = require('./movie_crawling.js');

mongoose.connection.openUri('mongodb://localhost/rosybrown');
mongoose.connection.on('open', function() {
    console.log('[Mongoose] Connected to Rosy Brown Database.')
});

/* create morpheme list scheme*/
var morpheme_list = new Models.MorphemeList({
    noun: 'dump'
});
morpheme_list.save();

//movie_crawling.getCommentsByNaver(163386, 'after');
movie_crawling.getCommentsByNaver(85579, 'before');
//python python_morpheme_analysis/extract_morpheme.py
