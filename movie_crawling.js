var client = require('cheerio-httpcli');
var Models = require('./models');
var mongoose = require('mongoose');

var param = {};
var checkURLlist = {};
var idx = 0;
var count = 0;

var isExist = (url) => {
    for (var i in checkURLlist) {
        if (checkURLlist[i] === url) {
            return true;
        }
    }
    checkURLlist[idx++] = url;
    return false;
}

var movieCommentsCrawling = (movie_id, type, url) => {
    
    if (isExist(url)) return;
    
    client.fetch(url, param, function(err, $, res) {
        $('.score_result>ul>li').each(function(idx) {
            var data = $(this);
            var star, isViewer, comment, date;
            
            try {
                star = data.find('.st_on').attr('style').split(':')[1].split('0.0%')[0];
                isViewer = data.find('.ico_viewer').text();
                comment = data.find('p')[0].children[0].data;
                if (comment == undefined) {
                    comment = data.find('p')[0].children[1].data;
                }
                date = data.find('em')[2].children[0].data;
            } catch(exception) {
                console.log(exception);
            } finally {
                count++;
                console.log(count+' , ' + star + ',' + isViewer + ',' + comment + ',' + date);

                if (star !== undefined && isViewer !== undefined && comment !== undefined && date !== undefined) {
                    var commentInfo = new Models.Comments({
                        movie_id: movie_id,
                        type: type,
                        rating: star,
                        isViewer: isViewer,
                        comment: comment,
                        written_date: date
                    });
                    commentInfo.save();
                }
            }
        });

        $('.paging>div>a').each(function(idx) {
            var url = $(this).attr('href');
            movieCommentsCrawling(movie_id, type, 'http://movie.naver.com'+url);
        })
    });
}

exports.getCommentsByNaver = (movie_id, type) => {
    Models.Comments.remove({},function(err,doc){});
    var TARGET_URL = 'http://movie.naver.com/movie/bi/mi/pointWriteFormList.nhn?code='+movie_id+'&type='+type+'&isActualPointWriteExecute=false&isMileageSubscriptionAlready=false&isMileageSubscriptionReject=false&page=1';
    movieCommentsCrawling(movie_id, type, TARGET_URL);
}