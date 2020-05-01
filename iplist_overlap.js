const filename = "IPLIST.xlsx";
const maxLine = 10;

const xlsx = require('xlsx');

const workbook = new xlsx.readFile(filename);

let sheetname1 = workbook.SheetNames[0];
let sheet1 = workbook.Sheets[sheetname1];
let cell = [];
let ip1234 = [];
let ip = String;
let ip_first = String;
let ip_last = String;

const CellPosition = (i, j) => {
    return(String.fromCharCode(j+64)+i);
}

for (let row = 0; row <= maxLine; row++) {
    cell[row] = new Array(7);
}

for (let row = 2; row <= maxLine; row++) {
    for (let col = 1; col <= 4; col++) {
        cell[row][col] = sheet1[CellPosition(row, col)].v
    }
    ip1234 = cell[row][3].split('.');
    ip_first = ip1234[0]*256*256*256 + ip1234[1]*256*256 + ip1234[2]*256 + ip1234[3]*1;
    ip_last = ip_first + Math.pow(2, 32-cell[row][4]) - 1;
    cell[row][5] = ip_first;
    cell[row][6] = ip_last;
}

let ip_min = 0;
let ip_max = 0;

for (let row = 2; row <= maxLine; row++) {
    ip_min = cell[row][5];
    ip_max = cell[row][6];
    for (let scan = row+1; scan <=maxLine; scan++) {
        if (((ip_min >= cell[scan][5]) && (ip_min <= cell[scan][6])) || ((ip_max >= cell[scan][5]) && (ip_max <= cell[scan][6])) || ((ip_min <= cell[scan][5]) && (ip_max >= cell[scan][6]))) {
            if (cell[row][7]) {
                cell[row][7] += "{" + cell[scan][1] + ": " + cell[scan][3] + "/" + cell[scan][4] + "}";
            }  else {
                cell[row][7] = "{" + cell[scan][1] + ": " + cell[scan][3] + "/" + cell[scan][4] + "}";
            }
            if (cell[scan][7]) {
                cell[scan][7] += "{" + cell[row][1] + ": " + cell[row][3] + "/" + cell[row][4] + "}";
            } else {
                cell[scan][7] = "{" + cell[row][1] + ": " + cell[row][3] + "/" + cell[row][4] + "}";
            }
//            console.log("[" + row + "]" + cell[row][1] + ": " + cell[row][3] + "/" + cell[row][4]);
//            console.log("[" + scan + "]" + cell[scan][1] + ": " + cell[scan][3] + "/" + cell[scan][4]);
        }
    }
}

const outputFilename = "Out_IPLIST.xlsx";

const excel4node = require('excel4node');
const workbook4node = new excel4node.Workbook();
const sheet4node = workbook4node.addWorksheet('IP List');

sheet4node.cell(1, 1).string("IP List Name");
sheet4node.cell(1, 2).string("IP Type");
sheet4node.cell(1, 3).string("IP Address");
sheet4node.cell(1, 4).string("Mask");
sheet4node.cell(1, 5).string("Overlap Info");

for (let row = 2; row <= maxLine; row++) {
    for (let col = 1; col <= 4; col++) {
        sheet4node.cell(row, col).string(cell[row][col].toString());
    }
    if (cell[row][7]) {
        sheet4node.cell(row, 5).string(cell[row][7].toString());
    }
}

workbook4node.write(outputFilename);