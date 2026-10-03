

//Encapsulation =private data +public method

import { Page ,Locator} from "@playwright/test";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage
{
    //locator

    private readonly productList;
    private readonly footerLinks;
    private readonly addToCartButton;
    private readonly cartOption;


    //constructor
    constructor(page:Page)
{
    super(page);
    this.productList=page.locator("div.inventory_item_name ");
    this.footerLinks=page.locator("footer a");
    this.addToCartButton=page.locator("//button[text()='Add to cart']")
    this.cartOption=page.locator("a.shopping_cart_link");
}

    //methods

    async getProductCount():Promise<number>
    {
       return await this.productList.count();
    }

    async getProductDetails():Promise<string[]>
    {
       return await this.productList.allInnerTexts();
    }

    async addProductIntoCart(pname:string)
    {
       let allProducts:Locator[]=await this.productList.all();
        for(let product of allProducts)
        {
            if((await product.innerText()).includes(pname))
            {
                //select
                await product.click();
                break;
            }
        }
        //add the product into cart
        await this.waitUtil();
        await this.addToCartButton.click();
        console.log(pname+" added into cart!");
        

    }

    async getAllFootersCount():Promise<number>
    {
        return await this.footerLinks.count();
    }

    async getAllFootersList():Promise<void>
    {
        console.log("----Footer link details----");
        
        let allFooters:Locator[]=await this.footerLinks.all();
        for(let f of allFooters)
        {
            console.log("link attribute value: "+await f.getAttribute("href"));
            console.log("link text is: "+await f.innerText());
            
            
        }
    }


    async gotoCartPage():Promise<void>
    {
        await this.cartOption.click();
    }



}

