import { Page, expect } from '@playwright/test';

export class NavegationPage {
    
    readonly page: Page;

    constructor(page: Page){
        this.page = page
    }

    async homePage(){
        await this.page.locator('nav').locator('#nav-home').click();
        await expect(this.page).toHaveURL('http://localhost:8080/index.html');
    }

    async loginPage(){
        await this.page.locator('nav').locator('#nav-login').click();
        await expect(this.page).toHaveURL('http://localhost:8080/login.html');
    }

    async productsPage(){
        await this.page.locator('nav').locator('#nav-products').click();
        await expect(this.page).toHaveURL('http://localhost:8080/products.html');
    }

    async checkoutPage(){
        await this.page.locator('nav').locator('#nav-checkout').click();
        await expect(this.page).toHaveURL('http://localhost:8080/checkout.html');
    }

    }
