var fs = require('fs');
var xl = require('excel4node');

var wb = new xl.Workbook();
var result = wb.addWorksheet('sheet1');
result.cell(1,1).string('단어');
result.cell(1,2).string('카운트');
wb.write('result.xlsx');

var morpheme_list = fs.readFileSync('morpheme.txt', 'utf-8');
var list = morpheme_list.split('\r\n');
var count = 1;

var m = new Map();
var cnt;

for (var i in list) {
    if (list[i] != '') {
        
        cnt = m.get(list[i]);
        if (cnt == undefined) {
            m.set(list[i],1);
        } else {
            m.delete(list[i]);
            m.set(list[i], parseInt(cnt)+1);
        }
    }
}

for (var [key, value] of m) {
    result.cell(count+1,1).string(key);
    result.cell(count+1,2).number(parseInt(value));
    count++;
    wb.write('result.xlsx');
}