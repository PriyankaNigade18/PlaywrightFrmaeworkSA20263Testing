

import {test,expect} from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage.js";


//AAA: arrange(precodition)--->act(design test)--->assert(validation)

test("Test for validate url",async({page})=>{
let loginPage=new LoginPage(page);
await loginPage.gotoLoginPage();
let actUrl=await loginPage.getPageUrl();
expect(actUrl).toBe("https://www.saucedemo.com/");
console.log("current url is: "+actUrl);
})

test("Test for validate title",async({page})=>{

let loginPage=new LoginPage(page);
await loginPage.gotoLoginPage();
let appTitle=await loginPage.getPageTitle();
expect(appTitle).toBe("Swag Labs");
console.log("Application title is: "+appTitle);
})

test("Test for Login feature",async({page})=>{

    let loginPage=new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.fillUserName("standard_user");
    await loginPage.fillPassword("secret_sauce");
    await loginPage.clickOnLogin();
    expect(page).toHaveURL(/inventory/);
    console.log("User login successfully and navigated to inventory page");
})