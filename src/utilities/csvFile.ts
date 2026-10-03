
import fs from "fs";
import Papa from "papaparse"


//header: If true, the first row of parsed data will be interpreted as field names.
export function readCsvFile(index:number):any
{
     //first get the file path
    const csvFile:string=fs.readFileSync("src/testData/App.csv","utf-8");

    //parse the file
    const result=Papa.parse(csvFile,{
        header:true,
        skipEmptyLines:true
    })

    return result.data[index];//retrun single row
}