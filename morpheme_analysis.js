var fs = require('fs');
var xl = require('excel4node');
var Models = require('./models');
var mongoose = require('mongoose');

var count = 1;
var wb = new xl.Workbook();
var result = wb.addWorksheet('sheet1');
result.cell(1,1).string('단어');
result.cell(1,2).string('카운트');
wb.write('result.xlsx');

var m = new Map();
var cnt;

exports.morphemeAnalysis = () => {
    Models.MorphemeList.find({}, function(err, doc){
        for (var i in doc) {
            cnt = m.get(doc[i].noun);
            if (cnt == undefined) {
                m.set(doc[i].noun, 1);
            } else {
                m.delete(doc[i].noun);
                m.set(doc[i].noun, parseInt(cnt)+1);
            }
            console.log(m);
        }
    
        for (var [key, value] of m) {
            console.log(key +","+ value);
            result.cell(count+1,1).string(key);
            result.cell(count+1,2).number(parseInt(value));
            count++;
            wb.write('result.xlsx');
        }
    });    
}