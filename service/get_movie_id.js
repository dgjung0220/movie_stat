var client = require('cheerio-httpcli');

var cnt = 0;

exports.search_movie = (req, res) => {
    var viewModel = {
        movie_list : new Array
    }
    var movieSearchURL = 'http://movie.naver.com/movie/search/result.nhn?query='+req.query['movie_name']+'&section=movie&ie=utf8';
    
    p = client.fetch(encodeURI(movieSearchURL), {});
    p.then(function (results) {
        results.$('#old_content>.search_list_1>li').each(function(idx) {
            var data = results.$(this);
            var imgSrc = data.find('.result_thumb>a>img').attr('src');
            var movie_code = data.find('dt>a').attr('href').split('/movie/bi/mi/basic.nhn?code=')[1];
            var movie_name = data.find('dt').text();
            var etc = data.find('.etc').text();
            
            viewModel.movie_list.push({
                imgSrc : imgSrc,
                movie_code : movie_code,
                movie_name : movie_name,
                etc : etc
            })
        });
    });
    p.catch(function (err) {
        console.log(err);
    });
    p.finally(function() {
        console.log(viewModel);
        res.render('index', viewModel);
    });
}