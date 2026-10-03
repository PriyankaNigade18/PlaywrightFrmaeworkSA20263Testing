
import {test,expect} from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage.js";
import { InventoryPage } from "../src/pages/InventoryPage.js";

let loginPage:LoginPage;
let inventoryPage:InventoryPage;

test.beforeEach(async({page})=>{
//create object of pages
loginPage=new LoginPage(page);
await loginPage.gotoLoginPage();
await loginPage.doLogin("standard_user","secret_sauce");
inventoryPage=new InventoryPage(page);
})



test("Test for Total Product count",async({})=>{

   let totalProduct=await inventoryPage.getProductCount();
   expect(totalProduct).toBe(6);
   console.log("Total Products matched!: "+totalProduct);
   
})

test("Test for get the product details",async({})=>{
    let allProducts=await inventoryPage.getProductDetails();
    console.log(allProducts);
    expect(allProducts).toContain("Sauce Labs Bolt T-Shirt");
    console.log("Product found!");
    
})

test("Test for add product into cart",async({})=>{

   await inventoryPage.addProductIntoCart("Sauce Labs Bolt T-Shirt");
   
})