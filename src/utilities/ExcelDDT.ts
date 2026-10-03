

import XLSX from "xlsx"

export function readExcelFileDDT(sheetName:string):any
{
    //read the file
let workbook=XLSX.readFile("src/testData/TestApp.xlsx");

//wb-->sheet
let worksheet=workbook.Sheets[sheetName]//sheetname

//JonsObject
let jsonObjectData=XLSX.utils.sheet_to_json(worksheet);

//Object---specific row
return jsonObjectData;

}