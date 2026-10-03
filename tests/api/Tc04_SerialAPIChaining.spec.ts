/*
Api chaining
==============
When we send request and response comming from one api we reused as prerequisite to other api 
that is api chaining

1. create new resource(post)--->bookingid--->sending Get call(Booking detail)
2. create new resource(post)---> bookingid+ token from Auth API--->Full update resource(PUT)
3. create new resource(post)---> bookingid+ token from Auth API--->partial update resource(patch)
4. create new resource(post)---> bookingid+ token from Auth API--->delete resource

//temporary understanding
In Playwright all test casesexecute in parallel
-current test case need to execute in sequence
test.describe.serial()


Note:
Test case should be independent, its executing parllelly
right technique to api testing

*/

import {test,expect} from "@playwright/test";
import { readingAPIPayload } from "../../src/utilities/ReadingAPI.js";

let BaseUrl=process.env.API_URL!;

let bookingId:number;
let token:string;

test.describe.serial("This is suite for API chaining",()=>{

test("POST: create new Booking",async({request})=>{

    console.log("New Booking is creating.....");
    
    let payload=await readingAPIPayload("postdata");

    let response=await request.post(`${BaseUrl}/booking`,{headers:{
                                            "Content-Type":"application/json"
                                        },data:payload});

    expect(response.status()).toBe(200);

    let jsonResponse=await response.json();
    console.log("Booking created: ",jsonResponse);


    //id
    bookingId=jsonResponse.bookingid;
    console.log("Booking created with id: "+jsonResponse.bookingid);
    
})

//get booking details for new booking is added

test("GET: Get the newlly added booking details",async({request})=>{

    console.log("Collecting Newly added Booking details for id: ......"+bookingId);
    let response=await request.get(`${BaseUrl}/booking/${bookingId}`);

    expect(response.status()).toBe(200);

    //json response
    let jsonResponse=await response.json();
    console.log("Booking details: ", jsonResponse);
    

})

test("Post: Create new Token for update and delete request",async({request})=>{

    console.log("Post Call To generate token.........");
    
    let payload=await readingAPIPayload("authdata");
    let response=await request.post(`${BaseUrl}/auth`,{headers:{
                                            "Content-Type":"application/json"
                                        },data:payload});

    expect(response.status()).toBe(200);

    //extract the token
    let jsonResponse=await response.json();
    token=jsonResponse.token;

    console.log(`API token is created ${token} for id ${bookingId}`);
    
})


//update full record
test("PUT: Test for Full update for current booking",async({request})=>{

console.log("Updating full record.....");


//payload
let payload=await readingAPIPayload("putdata");

let response=await request.put(`${BaseUrl}/booking/${bookingId}`,{headers:{
                                                    "Content-Type": "application/json",
                                                    "Accept": "application/json",
                                                    "Cookie": `token=${token}`
                                                },data:payload});

expect(response.status()).toBe(200);

let jsonResponse=await response.json();
console.log("Full update record is....", jsonResponse);



})


//update partial record
test("PATCH: Update partial record",async({request})=>{

    console.log("Updating partial record.....");


//payload
let payload=await readingAPIPayload("patchdata");

let response=await request.patch(`${BaseUrl}/booking/${bookingId}`,{headers:{
                                                    "Content-Type": "application/json",
                                                    "Accept": "application/json",
                                                    "Cookie": `token=${token}`
                                                },data:payload});

expect(response.status()).toBe(200);

let jsonResponse=await response.json();
console.log("Partial update record is....", jsonResponse);



})


//delete
test("DELETE: Delete current record",async({request})=>{


    let response=await request.delete(`${BaseUrl}/booking/${bookingId}`,{headers:{
                                    "Content-Type": "application/json",
                                    "Cookie": `token=${token}`
                                }});
    
    expect(response.status()).toBe(201);
    console.log("Status code is: "+response.status());

    expect(response.statusText()).toBe("Created");
    console.log("Status message is: "+response.statusText());
    
    console.log("Record deleted for id: "+bookingId);
    
    


})


})









