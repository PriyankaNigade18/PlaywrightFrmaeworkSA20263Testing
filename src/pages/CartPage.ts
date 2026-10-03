

import {Page} from "@playwright/test"
import { BasePage } from "./BasePage";
//Encapsulation=private data +public methods

export class CartPage extends BasePage
{
//locators
private readonly productName;
private readonly removeButton;
private readonly continueShoppingBtn;
private readonly checkoutButton;
private readonly cartoption;

//constructor
constructor(page:Page)
{
super(page);
this.productName=page.locator("div.inventory_item_name");
this.removeButton=page.getByRole('button',{name:"Remove"});
//this.continueShoppingBtn=page.getByRole('button',{name:"Go back Continue Shopping"});
this.continueShoppingBtn=page.locator("button#continue-shopping");
this.checkoutButton=page.getByRole('button',{name:"Checkout"});
this.cartoption=page.locator("a.shopping_cart_link");
}

//methods
async gotoCartPage():Promise<void>
{
await this.cartoption.click();
}

async getCartProductDetails():Promise<string[]>
{
    return await this.productName.allInnerTexts();
}

async removeProduct():Promise<void>
{
    await this.removeButton.click();
}

async doContinueShopping():Promise<void>
{
    return await this.continueShoppingBtn.click();

}

async goToCheckoutPage():Promise<void>
{
    return await this.checkoutButton.click();
}


}