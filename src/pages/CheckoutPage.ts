
import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage
{
    //locator
    private readonly firstName;
    private readonly lastName;
    private readonly postalCode;
    private readonly continueButton;
    private readonly cancelButton;


    //constructor
    constructor(page:Page)
    {
        super(page);
        this.firstName=page.getByRole('textbox',{name:"First Name"});
        this.lastName=page.getByRole('textbox',{name:"Last Name"});
        this.postalCode=page.getByRole('textbox',{name:"Zip/Postal Code"});
        this.continueButton=page.getByRole('button',{name:"Continue"});
        //this.cancelButton=page.getByRole("button",{name:"Go back Cancel"});
        this.cancelButton=page.locator("button#cancel");
    }


    //methods

    async doContinueCheckout(fn:string,ln:string,pc:string):Promise<void>
    {
        await this.firstName.fill(fn);
        await this.lastName.fill(ln);
        await this.postalCode.fill(pc);
        console.log("Checkout process started for user : "+fn);
        await this.continueButton.click();
        

    }


    async doCancelProcess():Promise<void>
    {
        await this.cancelButton.click();
    }





}

