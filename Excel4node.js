const outputFileName = "out.xlsx";
const excel = require('excel4node');
const workbook = new excel.Workbook();

const sheet1 = workbook.addWorksheet('Sheet 1');
const sheet2 = workbook.addWorksheet('Sheet 2');

const headerCell = workbook.createStyle({
    font: {
        color: '#FFFFFF',
    },    
    fill: {
        type: 'pattern',
        patternType: 'solid',
        bgcolor: '#4472C4',
        fgColor: '#4472C4',
    },
});

sheet1.cell(1,1).string("Column A").style(headerCell);
sheet1.cell(1,2).string("Column B").style(headerCell);
sheet1.cell(1,3).string("Column C").style(headerCell);

sheet1.cell(2,1).string("1");
sheet1.cell(2,2).string("2");
sheet1.cell(2,3).string("3");

workbook.write(outputFileName);
