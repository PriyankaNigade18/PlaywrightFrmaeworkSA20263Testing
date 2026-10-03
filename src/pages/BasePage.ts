
import {Page} from "@playwright/test";


export class BasePage
{
    //BaseClass is required to initialize every page class(login,register,addtocart)
    //Readonly  property we can add for object to create constant property
    //page variable

     protected readonly page;


    constructor(page:Page)
    {
        this.page=page;
    }


    async getPageTitle():Promise<string>
    {
       return await this.page.title();
    }

   async getPageUrl():Promise<string>
    {
        return this.page.url();
    }


    async waitUtil():Promise<void>
    {
        await this.page.waitForTimeout(1500);
    }



}
