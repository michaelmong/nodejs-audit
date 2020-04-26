const filename = "out.xlsx";

const exceljs = require('exceljs');
const workbook = new exceljs.Workbook();

let cell1 = new Array;
let cell2 = new Array;
workbook.xlsx.readFile(filename).then(() => {
    let sheet1 = workbook.getWorksheet(1);
//    let sheet2 = workbook.getWorksheet(2);
//    let sheet3 = workbook.getWorksheet(3);

    for (row = 1; row <= sheet1.rowCount; row++) {
        console.log("Row ", row);
        for (col = 1; col <= sheet1.columnCount; col++) {
            console.log(sheet1.getCell(row, col)._value.model.value);
        }
    }
});