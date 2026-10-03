
import {test,expect, APIResponse} from "@playwright/test"

//let BaseUrl="https://restful-booker.herokuapp.com";

let BaseUrl=process.env.API_URL!;

test("POST Request: Create new resource with manual payload",async({request})=>{

    //Js object payload
    let payload={
    firstname : "Priyanka",
    lastname : "Nigade",
    totalprice : 999,
    depositpaid : true,
    bookingdates : {
        checkin : "2026-09-12",
        checkout : "2026-09-13"
    },
    additionalneeds : "Breakfast"
    }



let response:APIResponse=await request.post(`${BaseUrl}/booking`,{headers:
                                                                {
                                                                "Content-Type":"application/json"
                                                                },
                                                                data:payload});//data will convert JSObject into JSON String
                                                               

//assertion
expect(response.status()).toBe(200);
console.log("Status code is: "+response.status());

expect(response.statusText()).toBe("OK");
console.log("Status message is: "+response.statusText());

//Json response
let jsonResponse=await response.json();
console.log(jsonResponse);

//Response validation

//To validate response property
expect(jsonResponse).toHaveProperty("bookingid");

//bookingid should be number type
//expect.any() matches any object instance created from the constructor or a corresponding primitive type.
expect(jsonResponse.bookingid).toEqual(expect.any(Number));

//firstname should be string type
expect(jsonResponse.booking.firstname).toEqual(expect.any(String));

//depositpaid": true,
expect(jsonResponse.booking.depositpaid).toEqual(expect.any(Boolean));

                                                  
//validate value
//"firstname": "Priyanka"
expect(jsonResponse.booking.firstname).toBe("Priyanka");
console.log("First name matched: "+jsonResponse.booking.firstname);


//to validate Data/fields of Object
//first for booking object
let bookingObject=jsonResponse.booking;
expect(bookingObject).toMatchObject({
    firstname : "Priyanka",
    lastname : "Nigade",
    totalprice : 999,
    depositpaid : true,
    bookingdates : {
        checkin : "2026-09-12",
        checkout : "2026-09-13"
    },
    additionalneeds : "Breakfast"
    });

//second for bookingdates object
let bookingdatesObject=jsonResponse.booking.bookingdates;
expect(bookingdatesObject).toMatchObject({
        checkin : "2026-09-12",
        checkout : "2026-09-13"
    })



})