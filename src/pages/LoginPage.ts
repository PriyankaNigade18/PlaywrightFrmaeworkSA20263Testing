
/*
Every page class maintain Encapsulation principle
Encapsulation=private data + public function
*/

import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage
{

    //locator(data)
    private readonly userName;
    private readonly password;
    private readonly loginButton;
    private readonly errorheading;

    //constructor to initialize locator
    constructor(page:Page)
    {
        super(page);
        this.userName=page.getByPlaceholder("Username");
        this.password=page.getByPlaceholder("Password");
        //this.loginButton=page.getByRole('button',{name:'Login'});
        this.loginButton=page.locator("input#login-button");
        //this.errorheading=page.getByRole('heading',{level:3});
        this.errorheading=page.locator("h3[data-test='error']");

    }

    //methods(actions)

    async gotoLoginPage():Promise<void>
    {
       await this.page.goto("/");//read url from baseUrl varible from playwright configuration
    }

//     async getAppTitle():Promise<string>
//     {
//        return await this.page.title();
//     }

//    async getAppUrl():Promise<string>
//     {
//         return this.page.url();
//     }


    async fillUserName(un:string):Promise<void>
    {
       await this.userName.fill(un);
    }


    async fillPassword(psw:string):Promise<void>
    {
        await this.password.fill(psw);
    }

    async clickOnLogin():Promise<void>
    {
        await this.loginButton.click();
        
    }

    async doLogin(un:string,psw:string):Promise<void>
    {
        await this.userName.fill(un);
        await this.password.fill(psw);
        await this.loginButton.click();
    }


    async getErrorMessage():Promise<string>
    {
        return await this.errorheading.innerText();
    }
}