var mecab = require('mecab-ya');
var fs = require('fs');
var xlsx = require('exceljs');

var workbook = new xlsx.Workbook();
workbook.xlsx.readFile('test.xlsx')
    .then(function() {
        var worksheet = workbook.getWorksheet('total');
        var m = new Map();
        var temp;

        fs.exists('morpheme.txt', (exists) => {
            if (exists) {
                fs.unlinkSync('morpheme.txt');
            }
        })
        
        worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
            if (rowNumber > 1 && row.values[2] > 8) {   
                mecab.nouns(row.values[4], function (err, result) {
                    for(var i in result) {
                        fs.appendFileSync('morpheme.txt', result[i]+'\n');
                    }
                });
            }    
        });
    }
)