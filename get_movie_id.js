var client = require('cheerio-httpcli');

var search_movie = (movieName) => {
    var movieSearchURL = 'http://movie.naver.com/movie/search/result.nhn?query='+movieName+'&section=movie&ie=utf8';
    client.fetch(encodeURI(movieSearchURL), {}, function(err, $, res) {
        $('#old_content>.search_list_1>li').each(function(idx) {
            var data = $(this);
            
            var imgSrc = data.find('.result_thumb>a>img').attr('src');
            var movie_code = data.find('dt>a').attr('href').split('/movie/bi/mi/basic.nhn?code=')[1];
            var movie_name = data.find('dt').text();
            var etc = data.find('.etc').text();
            
            console.log(movie_code + ">" + movie_name);
            console.log(etc);
        });
    });
}

search_movie('꾼');