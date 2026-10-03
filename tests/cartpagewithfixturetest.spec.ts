
import {test,expect} from "../src/fixtures/pagefixtures.js";
import { readExcelFileSheetWise } from "../src/utilities/ExcelFileReading.js";


test.beforeEach(async({loginPage,inventoryPage})=>{
//  let data=readExcelFileSheetWise("LoginPage",0);
// await loginPage.doLogin(data.username,data.password);
await loginPage.doLogin(process.env.APPUSERNAME!,process.env.APPPASSWORD!);
await inventoryPage.waitUtil();
let ivpagedata=readExcelFileSheetWise("InventoryPage",0);
await inventoryPage.addProductIntoCart(ivpagedata.product1);
})



test('Test for cart page launch',async({cartPage})=>{
await cartPage.gotoCartPage();
await cartPage.waitUtil();
expect(await cartPage.getPageUrl()).toContain("cart");
console.log("User Navigated to cart page!");
})

test("Test for getCart Product details",async({cartPage})=>{

    await cartPage.gotoCartPage();
    let details=await cartPage.getCartProductDetails();
    console.log(details);

    expect(details[0]).toBe("Sauce Labs Fleece Jacket");
    console.log("Product validation is done!");
    
    
})

test("Test for remove product",async({cartPage})=>{

    await cartPage.gotoCartPage();
    await cartPage.removeProduct();
    expect(cartPage.getCartProductDetails.length).toBe(0);
    console.log("Product removed from the cart!");
    
})

test("Test for continue shopping and add new product into cart",async({cartPage,inventoryPage})=>{

    await cartPage.gotoCartPage();
    await cartPage.doContinueShopping();
    //product2
  let ivpagedata=readExcelFileSheetWise("InventoryPage",0);
  await inventoryPage.addProductIntoCart(ivpagedata.product2);
  await inventoryPage.waitUtil();
  await inventoryPage.gotoCartPage();
  let data=await cartPage.getCartProductDetails();
  console.log("Total product added: "+data.length);
  expect(data[1]).toBe("Sauce Labs Backpack");
})

test("Test validate checkout page Launch",async({cartPage})=>{
await cartPage.gotoCartPage();
await cartPage.goToCheckoutPage();
expect(await cartPage.getPageUrl()).toBe("https://www.saucedemo.com/checkout-step-one.html");
console.log("User Navigated to checkout page!");
})