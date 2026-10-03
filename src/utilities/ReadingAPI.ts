
import fs from "fs"

export async function readingAPIPayload(filename:string):Promise<any>
{
   return JSON.parse(fs.readFileSync("src/apiData/"+filename+".json",'utf-8'))//Converts a JavaScript Object Notation (JSON) string into an object.
    
}
