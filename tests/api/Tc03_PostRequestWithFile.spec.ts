

import {test,expect, APIResponse} from "@playwright/test"
import fs from "fs"
import { readingAPIPayload } from "../../src/utilities/ReadingAPI.js"; 


let BaseUrl=process.env.API_URL!;

test("POST Request: create new resource from Filedata",async({request})=>{

    //File is JSON--->Js Object
let payload=JSON.parse(fs.readFileSync("src/apiData/postdata.json",'utf-8'))//Converts a JavaScript Object Notation (JSON) string into an object.


let response:APIResponse=await request.post(`${BaseUrl}/booking`,{headers:{
                                            "Content-Type": "application/json"
                                            },data:payload})//Jsobject--->JSON


expect(response.status()).toBe(200);
console.log("Status code is: ",response.status());

//jsonreposne
let jsonResponse=await response.json();
console.log(jsonResponse);

//print booking id
console.log("Booking id created for request: "+jsonResponse.bookingid);




})

test("POST Request: create new resource from Filedata Utility",async({request})=>{

    //File is JSON--->Js Object
    let payload=await readingAPIPayload("postdata");

    
let response:APIResponse=await request.post(`${BaseUrl}/booking`,{headers:{
                                            "Content-Type": "application/json"
                                            },data:payload})//Jsobject--->JSON


expect(response.status()).toBe(200);
console.log("Status code is: ",response.status());

//jsonreposne
let jsonResponse=await response.json();
console.log(jsonResponse);

//print booking id
console.log("Booking id created for request: "+jsonResponse.bookingid);




})