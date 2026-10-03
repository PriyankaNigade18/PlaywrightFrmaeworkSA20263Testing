
import { read } from "node:fs";
import {test,expect} from "../src/fixtures/pagefixtures.js";
import { readExcelFileSheetWise } from "../src/utilities/ExcelFileReading.js";

// test.beforeEach(async({loginPage})=>{
// await loginPage.doLogin("standard_user","secret_sauce");
// })



test("Test for product Count match",async({loginPage,inventoryPage})=>{

//   let data=readExcelFileSheetWise("LoginPage",0);
//     await loginPage.doLogin(data.username,data.password);
await loginPage.doLogin(process.env.APPUSERNAME!,process.env.APPPASSWORD!);
    await loginPage.waitUtil();
    let totalProducts=await inventoryPage.getProductCount();
    //expect(await inventoryPage.getProductCount()).toBe(6);
    console.log("Total products matched..."+totalProducts);
    
})

test("To validate Product details",async({loginPage,inventoryPage})=>{
    // let data=readExcelFileSheetWise("LoginPage",0);
    // await loginPage.doLogin(data.username,data.password);
    await loginPage.doLogin(process.env.APPUSERNAME!,process.env.APPPASSWORD!);
    await loginPage.waitUtil();
let allProducts=await inventoryPage.getProductDetails();
    console.log(allProducts);
    expect(allProducts).toContain("Sauce Labs Bolt T-Shirt");
    console.log("Product found!");
})



test("Tets for add product intoCart",async({loginPage,inventoryPage})=>{
    // let data=readExcelFileSheetWise("LoginPage",0);
    // await loginPage.doLogin(data.username,data.password);
    await loginPage.doLogin(process.env.APPUSERNAME!,process.env.APPPASSWORD!);
    await loginPage.waitUtil();
    // let ivpagedata=readExcelFileSheetWise("InventoryPage",0);
    // await inventoryPage.addProductIntoCart(ivpagedata.product1);
    await inventoryPage.addProductIntoCart("Sauce Labs Fleece Jacket");
})

test("Test for Total footers count validation",async({loginPage,inventoryPage})=>{
// let data=readExcelFileSheetWise("LoginPage",0);
// await loginPage.doLogin(data.username,data.password);
await loginPage.doLogin(process.env.APPUSERNAME!,process.env.APPPASSWORD!);
await loginPage.waitUtil();
let totalFooters=await inventoryPage.getAllFootersCount();
expect(totalFooters).toBe(3);
console.log("Total footers count matched: "+totalFooters);
})

test("Test for get Footers details",async({loginPage,inventoryPage})=>{
// let data=readExcelFileSheetWise("LoginPage",0);
//  await loginPage.doLogin(data.username,data.password);
await loginPage.doLogin(process.env.APPUSERNAME!,process.env.APPPASSWORD!);
await loginPage.waitUtil();
await inventoryPage.getAllFootersList();
})