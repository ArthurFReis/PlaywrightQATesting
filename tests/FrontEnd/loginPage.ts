 import { Page, expect, Locator} from '@playwright/test';

   
 
 export class LoginPage {

    readonly page: Page;
    readonly usernameImput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator; 

    constructor(page: Page){
        this.page = page;
        this.usernameImput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.submitButton = page.locator('#btnLogin');
}

async login(user= 'valid_user', pass= 'secret123') {
    await this.page.locator('nav').locator('#nav-login').click();
    await expect(this.page).toHaveURL('http://localhost:8080/login.html');
    await this.usernameImput.fill(user);
    await this.passwordInput.fill(pass);
    await this.submitButton.click(); 
}
}