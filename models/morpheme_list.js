var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MorphemeListSchema = new Schema({
    noun: {type: String}
});

module.exports = mongoose.model('MorphemeList', MorphemeListSchema);