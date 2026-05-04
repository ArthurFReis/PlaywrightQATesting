import { test, expect, webkit } from '@playwright/test';
import { NavegationPage } from './navegationPage';



test.beforeEach(async ({ request, page }) => {

    const browser = await webkit.launch();
    const context = await browser.newContext();
    await page.goto('http://localhost:8080/login.html');
    await page.screenshot({path: "Evidencias/login/BeforeEach.png"});
    //await browser.close();
  });

test.describe.parallel('Login', () => {
    
    test('login correto', async ({ page }) => {
        const navigationPage = new NavegationPage(page);
        await navigationPage.loginPage();
        await page.fill('#username', 'valid_user');
        await page.locator('#username').fill('valid_user');
        await page.fill('#password',  'secret123');
        await page.screenshot({path: "Evidencias/login/PreenchimentoCorretoAmbos.png"});
        const btnLogin = await page.locator('#btnLogin').isDisabled();
        if (btnLogin === true) {
            console.log('O botão de login está desabilitado, verifique os campos de preenchimento');
        }
        else {
            await page.locator('#btnLogin').click();
            await expect(page.locator('#msg')).toHaveText('Login successful');
        }
        //await page.locator('#btnLogin').click();
        await page.screenshot({path: "Evidencias/login/LoginProductsCorreto.png"});
        
        
    });

    test('login usuario errado', async ({ page }) => {
        let errors = {"user": ["valid", "invalid", "user1", ""], "password": "secret123", "msn": ["ms1", "ms2", "ms3", "ms4"], "dados": ["dados1", "dados2", "dados3", "dados4"]};
        const navigationPage = new NavegationPage(page);
        await navigationPage.loginPage();
        for (const error in errors.user) {
            await page.locator('#username').fill(errors.user[error]);
            await page.locator('#password').fill(errors.password);
            await page.screenshot({path: `Evidencias/login/UsuarioErrado/Preenchimento${errors.dados[error]}.png`});      
            await page.locator('#btnLogin').click();
            await expect(page.locator('#msg')).toHaveText('Invalid credentials');
            await page.screenshot({path: `Evidencias/login/UsuarioErrado/PreenchimentoMessage${errors.msn[error]}.png`});
        }
    });

    test('login password errado', async ({ page }) => {
        let errors = {"password": ["secret1", "secret12", "secrect", ""], "user": "valid_user", "msn": ["ms1", "ms2", "ms3", "ms4"], "dados": ["dados1", "dados2", "dados3", "dados4"]};
        const navigationPage = new NavegationPage(page);
        await navigationPage.loginPage();
        for (const error in errors.password) {
            await page.locator('#username').fill(errors.user);
            await page.locator('#password').fill(errors.password[error]);
            await page.screenshot({path: `Evidencias/login/PasswordErrado/Preenchimento${errors.dados[error]}.png`});      
            await page.locator('#btnLogin').click();
            await expect(page.locator('#msg')).toHaveText('Invalid credentials');
            await page.screenshot({path: `Evidencias/login/PasswordErrado/PreenchimentoMessage${errors.msn[error]}.png`});
        }
        
    });
test('login localstorage', async ({ page }) => {

    const navigationPage = new NavegationPage(page);
    await navigationPage.loginPage();

    await page.evaluate(() => {
        localStorage.setItem('username', 'valid_user');
        localStorage.setItem('password', 'secret123');
    });

    let username: any =  "Hello";
    let password: any =  "xpto";
    
     username = await page.evaluate(() => localStorage.getItem('username'));
     password = await page.evaluate(() => localStorage.getItem('password'));
    
    await page.getByLabel('Username:').fill(username);
    await page.getByLabel('Password:').fill(password);   
    await page.screenshot({path: "Evidencias/login/localsotage/LoginlocalstoragePreenchido.png"});
    await page.locator('#btnLogin').click();
    await expect(page.locator('#msg')).toHaveText('Login successful');
    await page.context().storageState({ path: 'Evidencias/login/localsotage/storageState.json' });
    await page.screenshot({path: "Evidencias/login/localsotage/LoginlocalstorageClicado.png"});  
    
    await page.close();
    });

});