

import{test,expect} from "../src/fixtures/pagefixtures.js"
import { readExcelFileSheetWise } from "../src/utilities/ExcelFileReading.js";


test.beforeEach(async({loginPage,inventoryPage,cartPage})=>{
// let data=readExcelFileSheetWise("LoginPage",0);
// await loginPage.doLogin(data.username,data.password);
await loginPage.doLogin(process.env.APPUSERNAME!,process.env.APPPASSWORD!);
await inventoryPage.waitUtil();
let ivpagedata=readExcelFileSheetWise("InventoryPage",0);
await inventoryPage.addProductIntoCart(ivpagedata.product1);
await cartPage.gotoCartPage();
await cartPage.goToCheckoutPage();
await cartPage.waitUtil();
})

test("Test for complete checkout process",async({checkoutPage,overviewPage})=>{

let data=readExcelFileSheetWise("checkoutPage",0);
await checkoutPage.doContinueCheckout(data.firstname,data.lastname,data.postalcode);
await overviewPage.doFinishTheProcess();
let message=await overviewPage.getSuccesMessage();
expect(message).toBe("Thank you for your order!");
})