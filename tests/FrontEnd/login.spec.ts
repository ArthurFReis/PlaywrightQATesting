import { test, expect, webkit } from '@playwright/test';
import { NavegationPage } from './navegationPage';
import { realizarLogin } from '../../app/Comum/Login/login';
import { localStorageLogin } from '../../app/Comum/Login/login';



test.beforeEach(async ({ request, page }) => {

    const browser = await webkit.launch();
    const context = await browser.newContext();
    await page.goto('http://localhost:8080/login.html');
    await page.screenshot({path: "Evidencias/login/BeforeEach.png"});
    //await browser.close();
  });

test.describe.parallel('Login', () => {
    
    test('login correto', async ({ page }) => {
       await realizarLogin(page);  
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
    await localStorageLogin(page);
    }); 

});