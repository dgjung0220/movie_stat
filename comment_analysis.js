var mecab = require('mecab-ya');
var fs = require('fs');
var xlsx = require('exceljs');

var workbook = new xlsx.Workbook();
workbook.xlsx.readFile('test.xlsx')
    .then(function() {
        var worksheet = workbook.getWorksheet('total');

        worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
            if (rowNumber > 1 && row.values[2] > 8) {
                console.log(row.values[4]);
            }
        });
    })