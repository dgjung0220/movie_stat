var client = require('cheerio-httpcli');
var urlModule = require('url');
var xl = require('excel4node');
//var mongoose = require('mongoose');
var configs = require('./configs.js');

/*var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
            replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };    
mongoose.connection.openUri('mongodb://'+configs.dbUser+':'+configs.dbpassword+'@ds047075.mlab.com:47075/'+configs.dbName);
mongoose.connection.on('open', function() {
    console.log('Mongoose connected.');
});
*/

var wb = new xl.Workbook();
var total = wb.addWorksheet('total');
total.cell(1,1).string('Count');
total.cell(1,2).string('평점');
total.cell(1,3).string('관람유무');
total.cell(1,4).string('코멘트');
total.cell(1,5).string('날짜');
wb.write('test.xlsx');

var movie_id = 163386;
var TARGET_URL = 'http://movie.naver.com/movie/bi/mi/pointWriteFormList.nhn?code='+movie_id+'&type=after&isActualPointWriteExecute=false&isMileageSubscriptionAlready=false&isMileageSubscriptionReject=false&page=1';
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

var movieCommentsCrawling = (url) => {
    
    if (isExist(url)) return;
    
    client.fetch(url, param, function(err, $, res) {
        $('.score_result>ul>li').each(function(idx) {
            var data = $(this);
            var star = data.find('.st_on').attr('style').split(':')[1].split('0.0%')[0];
            var isViewer = data.find('.ico_viewer').text();
            var comment = data.find('p')[0].children[0].data;
            if (comment == undefined) {
                comment = data.find('p')[0].children[1].data;
            }
            var date = data.find('em')[2].children[0].data;
            
            count++;
            console.log(count+' , ' + star + ',' + isViewer + ',' + comment + ',' + date);
            total.cell(count+1,1).number(parseInt(count));
            total.cell(count+1,2).number(parseInt(star));
            total.cell(count+1,3).string(isViewer);
            total.cell(count+1,4).string(comment);
            total.cell(count+1,5).string(date);
            wb.write('test.xlsx');
        });

        $('.paging>div>a').each(function(idx) {
            var url = $(this).attr('href');
            movieCommentsCrawling('http://movie.naver.com'+url);
        })
    });
}


movieCommentsCrawling(TARGET_URL);