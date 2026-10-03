//API interception and mocking

import {test,expect} from "@playwright/test"


test("API-Interception-observe request",async({page})=>{

    /*
    I ma intercepting the main url to show you how many request internally goes to server total 5 you will see
    */
        await page.route("**/*",async(routePath)=>{// **/* match every url and every method
            console.log("API Interceted!");
            console.log("URL: "+routePath.request().url());
            console.log("RequestMethod: "+routePath.request().method());
            
            await routePath.continue();//send the request to real server

           })




    await page.goto("https://demo.playwright.dev/api-mocking/");

})

test("API-Interception-observe Single request",async({page})=>{

    /*
    I ma intercepting the only single url to show you  one request internally goes to server total 1 you will see
    */
        await page.route("**/api/v1/fruits",async(routePath)=>{
            console.log("API Interceted!");
            console.log("URL: "+routePath.request().url());
            console.log("RequestMethod: "+routePath.request().method());
            
            await routePath.continue();//send the request to real server

           })




    await page.goto("https://demo.playwright.dev/api-mocking/");

})


test("API Interception- To block any APi Request",async({page})=>{

await page.route("https://demo.playwright.dev/api-mocking/",async(routepath)=>{

    console.log("REquest intercepted!");
    await routepath.abort();//Aborts the route's request.
    
})

})


test("API Interception- mock the response",async({page})=>{


    //intercept it
    await page.route("https://jsonplaceholder.typicode.com/users/1",async(routepath)=>{

        //mock data
        let data={
            id:101,
            fname:"Sarang",
            location:"Pune"
        }

        //mock data we can send ads reposnce from server

        routepath.fulfill({
            status: 200,
            contentType:"application/json",
            body:JSON.stringify(data)//Js object to JSON

        })


    })

await page.goto("https://jsonplaceholder.typicode.com/users/1");
await page.waitForTimeout(2000);
})


test("API Interception-Mocking the current response",async({page})=>{

//intercepting: route()

await page.route("https://tutorialsninja.com/demo/index.php?route=product/search&search=macbook",async(routePath)=>{

    //mock data
    let fakeProducts=[
        {pid:101,pname:'Mackbook pro12',price:989809},
        {pid:102,pname:'Mackbook pro13',price:954658098},
        {pid:103,pname:'Mackbook pro14',price:9098098}
    ]

    //send mock data as server response
    routePath.fulfill({
        status:200,
        contentType:"application/json",
        body:JSON.stringify(fakeProducts)
    })



})




await page.goto("https://tutorialsninja.com/demo/index.php?route=product/search&search=macbook");
await page.waitForTimeout(2000);

})
