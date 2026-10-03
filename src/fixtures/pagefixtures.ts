
//I am renaming playwright inbuilt fixture so that modifications on its replica

import {test as baseTest} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { InventoryPage } from "../pages/InventoryPage.js";
import { CartPage } from "../pages/CartPage.js";
import { CheckoutPage } from "../pages/CheckoutPage.js";
import { OverviewPage } from "../pages/OverviewPage.js";

//define the type of fixture
type pageFixtures={

    //fixturename:PageClassName
    loginPage:LoginPage;
    inventoryPage:InventoryPage;
    cartPage:CartPage;
    checkoutPage:CheckoutPage;
    overviewPage:OverviewPage;
}


//to create custome fixture we use test.extend()
//we extends the baseTest as per pageFixtures type

export const test=baseTest.extend<pageFixtures>({

loginPage:async({page},use)=>{
//create page object
let loginPage=new LoginPage(page);
await loginPage.gotoLoginPage();

await use(loginPage);
//use is object which supply current fixture to test
},

inventoryPage:async({page},use)=>{
let inventoryPage=new InventoryPage(page);
await use(inventoryPage);
},

cartPage:async({page},use)=>{
let cartPage=new CartPage(page);
await use(cartPage);
},

checkoutPage:async({page},use)=>{
let checkoutPage=new CheckoutPage(page);
await use(checkoutPage);

},

overviewPage:async({page},use)=>{

    let overviewPage=new OverviewPage(page);
    await use(overviewPage);
}


})


export {expect} from "@playwright/test";
