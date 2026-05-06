import { Page, expect } from '@playwright/test';

// Função exportada que pode ser usada em qualquer lugar
export async function realizarLogin(page: Page) {
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
    }

    export async function localStorageLogin(page: Page) {
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
    //await page.close();
    }