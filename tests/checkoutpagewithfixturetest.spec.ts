

import {test,expect} from "../src/fixtures/pagefixtures.js"
import { readExcelFileSheetWise } from "../src/utilities/ExcelFileReading.js";



test.beforeEach(async({loginPage,inventoryPage,cartPage})=>{
// let data=readExcelFileSheetWise("LoginPage",0);
// await loginPage.doLogin(data.username,data.password);
await loginPage.doLogin(process.env.APPUSERNAME!,process.env.APPPASSWORD!);
await inventoryPage.waitUtil();
// let ivpagedata=readExcelFileSheetWise("InventoryPage",0);
// await inventoryPage.addProductIntoCart(ivpagedata.product1);
await inventoryPage.addProductIntoCart("Sauce Labs Fleece Jacket");
await cartPage.gotoCartPage();
await cartPage.goToCheckoutPage();
await cartPage.waitUtil();
})


test("Test for validate checkout",async({checkoutPage})=>{

let data=readExcelFileSheetWise("checkoutPage",0);
await checkoutPage.doContinueCheckout(data.firstname,data.lastname,data.postalcode);
expect(await checkoutPage.getPageUrl()).toBe("https://www.saucedemo.com/checkout-step-two.html");


})

test("Test for cancel Checkout process",async({checkoutPage})=>{
await checkoutPage.doCancelProcess();
expect(await checkoutPage.getPageUrl()).toBe("https://www.saucedemo.com/cart.html");
})