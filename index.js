var mecab = require('mecab-ya');
var client = require('cheerio-httpcli');
var urlModule = require('url');

var TARGET_URL = "http://movie.naver.com/movie/bi/mi/pointWriteFormList.nhn?code=163386&type=after&isActualPointWriteExecute=false&isMileageSubscriptionAlready=false&isMileageSubscriptionReject=false&page=";
var param = {};

for (var i = 0; i <= 19; i++) {
    client.fetch(TARGET_URL+i, param, function(err, $, res) {
        $('.score_result>ul>li').each(function(idx) {
            var data = $(this);
            var star = data.find('.st_on').attr('style').split(':')[1].split('0.0%')[0];
            var isViewer = data.find('.ico_viewer').text();
            var comment = data.find('p')[0].children[0].data;
            if (comment == undefined) {
                comment = data.find('p')[0].children[1].data;
            }
            
            console.log(star + ',' + isViewer + ',' + comment);
        });
    });
}