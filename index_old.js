var mongoose = require('mongoose');
var PythonShell = require('python-shell');

var Models = require('./models');
var movie_crawling = require('./movie_crawling.js');
var morpheme_analysis = require('./morpheme_analysis');

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

var pythonShell_option = {
    mode : 'text',
    pythonPath: '',
    pythonOptions: ['-u'],
    scriptPath: '',
    args: []
};

/*
movie_crawling.getCommentsByNaver(85579,'before');
PythonShell.run('python_morpheme_analysis/extract_morpheme.py', pythonShell_option, function (err, results) {
    if (err) throw err;
    console.log('%j', results);
}, function() {
    morpheme_analysis.morphemeAnalysis()
})    
morpheme_analysis.morphemeAnalysis();
*/

movie_crawling.getCommentsByNaver(85579,'before');