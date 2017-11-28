var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
    movie_id:     {type: Number},
    type:         {type: String},
    rating:       {type: Number},
    isViewer:     {type: Boolean},
    comment:      {type: String},
    written_date: {type: Date}
});

module.exports = mongoose.model('Comments', CommentsSchema);