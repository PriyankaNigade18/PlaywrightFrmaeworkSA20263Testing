
//https://learning.postman.com/docs/use/send-requests/authorization/authorization-types#basic-auth

import {test,expect, APIResponse} from "@playwright/test"
import {Buffer} from "buffer"
import { readingAPIPayload } from "../../src/utilities/ReadingAPI.js";

test("Test for NOAuth authentication algorithm",async({request})=>{

    const response:APIResponse=await request.get("https://jsonplaceholder.typicode.com/posts/1");

    //validate status code
    expect(response.status()).toBe(200);
    console.log("Status code matched! "+response.status());
    
    //get the responsebody
    const jsonRes=await response.json();
    console.log(jsonRes);
    




})


test("Test for Basic Authentication",async({request})=>{

    const username="postman";
    const password="password";

    //encode data in base64:Buffer package
    let bufferedIntobase64=Buffer.from(`${username}:${password}`).toString("base64");
    console.log(bufferedIntobase64);//cG9zdG1hbjpwYXNzd29yZA==
    
    const response=await request.get("https://postman-echo.com/basic-auth",{headers:
        {
            Authorization:`Basic ${bufferedIntobase64}`
        }
    });

    console.log(response.status());
    console.log(await response.text());
    expect(response.status()).toBe(200);

})

test("Test for APIKey ",async({request})=>{


    const apiKey="free_user_371D25GCR1ikcLkDHqH4qCYlrnH";

    const response=await request.get("https://reqres.in/api/users?page=2",{headers:{
        'x-api-key':`${apiKey}`
    }});

    expect(response.status()).toBe(200);
    console.log(await response.json());
    
})

test("Test for Bearer Token ",async({request})=>{

const token=process.env.ACCESSTOKEN!;

//payload
//let payload=await readingAPIPayload("gorestdata");
let email="priyanka26"+new Date().getTime()+"@gmail.com";
let payload={
    "name": "Priyanka",
    "email": email,
    "gender": "female",
    "status": "active"
}
const response=await request.post("https://gorest.co.in/public/v2/users",
    {headers:
    {
    Authorization:`Bearer ${token}`
    },data:payload});

    expect(response.status()).toBe(201);

    console.log(await response.json());
    

})

//OAuth2.0


