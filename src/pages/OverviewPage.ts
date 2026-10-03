

import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class OverviewPage extends BasePage
{

//locator
private readonly productName;
private readonly paymentDetails;
private readonly finishButton;
private readonly successMessage;
//constructor
constructor(page:Page)
{
super(page);
this.productName=page.locator("div.inventory_item_name");
this.paymentDetails=page.locator("div.summary_info div[class$='label']");
this.finishButton=page.getByRole('button',{name:'Finish'});
this.successMessage=page.getByRole('heading',{level:2});

}

async getPurchesProductDetails():Promise<string[]>
{
    return await this.productName.allInnerTexts();
}


async getPaymentDetails():Promise<string[]>
{
    return await this.paymentDetails.allInnerTexts();
}

async doFinishTheProcess():Promise<void>
{
   return await this.finishButton.click();

}

async getSuccesMessage():Promise<string>
{
return await this.successMessage.innerText();
}







}