/*
Api chaining
==============
When we send request and response comming from one api we reused as prerequisite to other api 
that is api chaining

1. create new resource(post)--->bookingid--->sending Get call(Booking detail)
2. create new resource(post)---> bookingid+ token from Auth API--->Full update resource(PUT)
3. create new resource(post)---> bookingid+ token from Auth API--->partial update resource(patch)
4. create new resource(post)---> bookingid+ token from Auth API--->delete resource

Note:
Test case should be independent, its executing parllelly
right technique to api testing

Recommended technique for Playwright

*/

let BaseUrl=process.env.API_URL!;

import {test,expect, APIResponse} from "@playwright/test"
import { readingAPIPayload } from "../../src/utilities/ReadingAPI.js"
import { basename } from "node:path";

test("Create new Booking--->get the same bookingdetails",async({request})=>{


    //step1: create new Booking: POST call
//payload

const payload=await readingAPIPayload("postdata");

//post request
const response:APIResponse=await request.post(`${BaseUrl}/booking`,{
                                        headers:{
                                            'Content-Type': 'application/json'
                                        },data:payload});

//assertion
expect(response.status()).toBe(200);
console.log("Status code is: "+response.status());//200

//to extract the json response payload
const jsonResponse=await response.json();
console.log(jsonResponse);

//to extract only booking id

const bookingId=jsonResponse.bookingid;
console.log("New booking created with bookingid: "+bookingId);

//step2: Get the booking details based on same bookingid
const getResponse=await request.get(`${BaseUrl}/booking/${bookingId}`);

//to extract current response
const jsonGetRes=await getResponse.json();
console.log("Get the booking details using id: "+bookingId);
console.log(jsonGetRes);

//assertion
expect(getResponse.status()).toBe(200);

})

test("Create new booking--->get the same booking--->Generate token--->full update the booking",async({request})=>{

//step1: create new booking

    const postPayload=await readingAPIPayload("postdata");
    const postResponse=await request.post(`${BaseUrl}/booking`,{headers:{"Content-Type":"application/json"},data:postPayload});

    //print new booking detials
    const res1=await postResponse.json();
    console.log("New Booking Created:",res1);
    
    //extract booking id
    const bookingId=res1.bookingid;
    console.log("New booking created with id: "+bookingId);
    

//step2: get the same booking
const getResponse=await request.get(`${BaseUrl}/booking/${bookingId}`);
//print it
console.log("Get: Get the booking details....");

console.log(await getResponse.json());


//Step3: Generate token
//authpayload
const authPayload=await readingAPIPayload("authdata");
const authResponse=await request.post(`${BaseUrl}/auth`,{headers:{"Content-Type":"application/json"},data:authPayload});

//print response
const res2=await authResponse.json();
console.log(res2);

//extract token
const authToken=res2.token;
console.log("Token generated: "+authToken);

//Step4: Full update for the same booking
    //newPayload
    const putPayload=await readingAPIPayload("putdata");
   const putResponse=await request.put(`${BaseUrl}/booking/${bookingId}`,{headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                    "Cookie":`token=${authToken}`
                        },data:putPayload});

        //print the response
        
        let res3=await putResponse.json();
        console.log("Updated booking is: ");
        console.log(res3);
        
        
        //assert status code
        expect(putResponse.status()).toBe(200);
    console.log("Current booking is updated successfully!");




})


test("Create new booking--->get the same booking--->Generate token--->partial update the booking",async({request})=>{

//step1: create new booking

    const postPayload=await readingAPIPayload("postdata");
    const postResponse=await request.post(`${BaseUrl}/booking`,{headers:{"Content-Type":"application/json"},data:postPayload});

    //print new booking detials
    const res1=await postResponse.json();
    console.log("New Booking Created:",res1);
    
    //extract booking id
    const bookingId=res1.bookingid;
    console.log("New booking created with id: "+bookingId);
    

//step2: get the same booking
const getResponse=await request.get(`${BaseUrl}/booking/${bookingId}`);
//print it
console.log("Get: Get the booking details....");

console.log(await getResponse.json());


//Step3: Generate token
//authpayload
const authPayload=await readingAPIPayload("authdata");
const authResponse=await request.post(`${BaseUrl}/auth`,{headers:{"Content-Type":"application/json"},data:authPayload});

//print response
const res2=await authResponse.json();
console.log(res2);

//extract token
const authToken=res2.token;
console.log("Token generated: "+authToken);

//Step4: partial update for the same booking
    //newPayload
    const patchPayload=await readingAPIPayload("patchdata");
   const patchResponse=await request.patch(`${BaseUrl}/booking/${bookingId}`,{headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                    "Cookie":`token=${authToken}`
                        },data:patchPayload});

        //print the response
        
        let res3=await patchResponse.json();
        console.log("Partial Updated booking is: ");
        console.log(res3);
        
        
        //assert status code
        expect(patchResponse.status()).toBe(200);
    console.log("Current booking is partially updated successfully!");




})


test("Create new booking--->get the same booking--->Generate token--->Delete the booking",async({request})=>{

//step1: create new booking

    const postPayload=await readingAPIPayload("postdata");
    const postResponse=await request.post(`${BaseUrl}/booking`,{headers:{"Content-Type":"application/json"},data:postPayload});

    //print new booking detials
    const res1=await postResponse.json();
    console.log("New Booking Created:",res1);
    
    //extract booking id
    const bookingId=res1.bookingid;
    console.log("New booking created with id: "+bookingId);
    

//step2: get the same booking
const getResponse=await request.get(`${BaseUrl}/booking/${bookingId}`);
//print it
console.log("Get: Get the booking details....");

console.log(await getResponse.json());


//Step3: Generate token
//authpayload
const authPayload=await readingAPIPayload("authdata");
const authResponse=await request.post(`${BaseUrl}/auth`,{headers:{"Content-Type":"application/json"},data:authPayload});

//print response
const res2=await authResponse.json();
console.log(res2);

//extract token
const authToken=res2.token;
console.log("Token generated: "+authToken);

//Step4: partial update for the same booking
    
const deleteRes=await request.delete(`${BaseUrl}/booking/${bookingId}`,{headers:{

    "Content-Type":"application/json",
    "Cookie":`token=${authToken}`
}})

//status code should be 201 and message should be Created

expect(deleteRes.status()).toBe(201);
console.log("Status code is: "+deleteRes.status());


expect(deleteRes.statusText()).toBe("Created");
console.log("Status message is: "+deleteRes.statusText());

//step5: get the deleted booking and validat 404 status code

const getRes=await request.get(`${BaseUrl}/booking/${bookingId}`);
//print it
console.log("Get: Get the booking details....");

let rawres=await getRes.text();
console.log(rawres);

expect(getRes.status()).toBe(404);
console.log("Record is deleted! so "+getRes.statusText());






})













