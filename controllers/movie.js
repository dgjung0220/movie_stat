var client = require('cheerio-httpcli');
var service = require('../service');

exports.searchCodeByName = (req, res) => {
    service.Get_Movie_Id.search_movie(req, res);
}

exports.searchCommentsById = (req, res) => {
    service.Get_Movie_Comment.getCommentsByNaver(req, res);
}