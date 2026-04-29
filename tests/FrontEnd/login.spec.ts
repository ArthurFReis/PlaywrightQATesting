import { test, expect, request } from '@playwright/test';
import { NavegationPage } from './navegationPage';

test.beforeEach(async ({ request, page }) => {
    await page.goto('http://localhost:8080/');
  });

test.describe.parallel('Login', () => {

    test('login correto', async ({ request, page }) => {
        const navigationPage = new NavegationPage(page);;
        await navigationPage.loginPage();
        await page.locator('#username').fill('valid_user');
        await page.locator('#password').fill('secret123');
        await page.screenshot({path: "Evidencias/login/PreenchimentoCorretoAmbos.png"});
        await page.locator('#btnLogin').click();
        await page.screenshot({path: "Evidencias/login/LoginProductsCorreto.png"});
        
        
    });

    test('login usuario errado', async ({ page }) => {
        const navigationPage = new NavegationPage(page);
        await navigationPage.loginPage();
        await page.locator('#username').fill('valid_user1');
        await page.locator('#password').fill('secret123');
        await page.screenshot({path: "Evidencias/login/LoginProductsErradoUsuario.png"});
        const status = await page.locator('#btnLogin').click();
        await page.screenshot({path: "Evidencias/login/LoginProductsErradoUsuarioSemMensagemErro.png"});


        
    });

    test('login password errado', async ({ page }) => {
        const navigationPage = new NavegationPage(page);
        await navigationPage.loginPage();
        await page.locator('#username').fill('valid_user');
        await page.locator('#password').fill('secret12');
        await page.screenshot({path: "Evidencias/login/LoginProductsErradoPassword.png"});
        await page.locator('#btnLogin').click();
        await page.screenshot({path: "Evidencias/login/LoginProductsErradoPasswordSemMensagemErro.png"});
        
    });
test('login localstorage', async ({ page }) => {

    const navigationPage = new NavegationPage(page);
    await navigationPage.loginPage();

    await page.evaluate(() => {
        localStorage.setItem('username', 'valid_user');
        localStorage.setItem('password', 'secret123');

    });
    let username: any = 'hello';
    let password: any = 'hi';

    
     username = await page.evaluate(() => localStorage.getItem('username'));
    //username?.toString();
     password = await page.evaluate(() => localStorage.getItem('password'));
    //password?.toString();


    await page.getByLabel('Username:').fill(username);
    await page.getByLabel('Password:').fill(password);   
    await page.screenshot({path: "Evidencias/login/localsotage/LoginlocalstoragePreenchido.png"});
    await page.locator('#btnLogin').click();

    await page.context().storageState({ path: 'Evidencias/login/localsotage/storageState.json' });
    await page.screenshot({path: "Evidencias/login/localsotage/LoginlocalstorageClicado.png"});   
    });

});