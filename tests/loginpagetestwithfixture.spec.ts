

import {test,expect} from "../src/fixtures/pagefixtures.js"
import {readExcelFileSheetWise} from "../src/utilities/ExcelFileReading.js"
import {readExcelFileDDT} from "../src/utilities/ExcelDDT.js"


test("Test for validate url of login page ",async({loginPage})=>{

    let pageUrl=await loginPage.getPageUrl();
    expect(pageUrl).toBe("https://www.saucedemo.com/");
    console.log("Current page url matched!: "+pageUrl);
    

})

test("Test for validate Title of login page",async({loginPage})=>{

    let pageTitle=await loginPage.getPageTitle();
    expect(pageTitle).toBe("Swag Labs");
    console.log("Current page Title matched!: "+pageTitle);
    

})


test("Test for login functionality with valid credentials",async({loginPage,page})=>{

    // let data=readExcelFileSheetWise("LoginPage",0);
    // await loginPage.doLogin(data.username,data.password);
    await loginPage.doLogin(process.env.APPUSERNAME!,process.env.APPPASSWORD!);
    await expect(page).toHaveURL(/inventory/);
    console.log("User logedIn successfully and Navigated to Inventory page!");
    
})

test("Test for login with invalid credentials-both username and passowrd is blank",async({loginPage})=>{

    await loginPage.doLogin("","");
    let errorMessage=await loginPage.getErrorMessage();
    //assert
    expect(errorMessage).toBe("Epic sadface: Username is required");
    console.log("Error message for blank username and password validated: "+errorMessage);
    
    

})


//data driven testing
let dataSet=readExcelFileDDT("DataDrivenTest");
for(let data of dataSet)
{
    test(`Test for invalid login ${data.id}`,async({loginPage})=>{

        await loginPage.doLogin(data.username,data.password);
        expect(await loginPage.getErrorMessage()).toBeTruthy();
        console.log("Error message: "+await loginPage.getErrorMessage());
        
        
    })
}
