import { Page, expect } from '@playwright/test';

// Função exportada que pode ser usada em qualquer lugar
export async function realizarLogin(page: Page) {
    const usuario = await page.locator('#username').isEditable();
    const senha = await page.locator('#password').isEditable();
    if (usuario === true && senha === true){
        await page.fill('#username', 'valid_user');
        await page.locator('#username').fill('valid_user');
        await page.fill('#password',  'secret123');
        await page.screenshot({path: "Evidencias/login/PreenchimentoCorretoAmbos.png"});
        const btnLogin = await page.locator('#btnLogin').isDisabled();
        const btnLogin2 = await page.locator('#btnLogin2').isVisible()
        if (btnLogin === true && btnLogin2 === true) {
            console.log('O botão de login está desabilitado, verifique os campos de preenchimento');
        }
        else {
            await page.locator('#btnLogin').click();    
        }
        const tempo = await page.locator('#msg').textContent({timeout:600});
        console.log('Menssage recebida: \n ', tempo)
        await expect(page.locator('#msg')).toHaveText('Login successful');
        //await page.locator('#btnLogin').click();
        await page.screenshot({path: "Evidencias/login/LoginProductsCorreto.png"});
    }
    }

    export async function testeBotoesMenuLogin(page: Page) {
    const menuButtons = {"ids":['#nav-home', '#nav-login', '#nav-products', '#nav-checkout']};
      
       for( var id in menuButtons.ids){
          if((await page.locator(menuButtons.ids[id]).isEnabled()) && (await page.locator(menuButtons.ids[id]).isDisabled())){
            console.log("O botão está invisivel ou está desabilitado!")
          }
          else {
               await page.locator(menuButtons.ids[id]).click();
               await page.screenshot({path: `Evidencias/login/Menu/menu-${menuButtons.ids[id]}.png`});
          }
      }
        console.log("Todas as páginas estão funcionando! \n");
}

    export async function pageResponsivoLogin(page: Page) {
    let tamanhos = {"nomes": ["iPhone_SE", "iPhone_XR", "iPhone_12_Pro", "iPhone_14_Pro_Max"], "width": [375,414,390,430], "height": [667,896,844,932]};
    for(const tamanho in tamanhos.width){
      await page.setViewportSize({ width: tamanhos.width[tamanho], height: tamanhos.height[tamanho]});
      await page.screenshot({path: `Evidencias/login/Responsivo/home-mobile-${tamanhos.nomes[tamanho]}.png`});
    }
     console.log("É responsivo! \n");
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
    const tempo = await page.locator('#msg').textContent({timeout:600});
    console.log('Menssage recebida: \n', tempo)
    await expect(page.locator('#msg')).toHaveText('Login successful');
    await page.context().storageState({ path: 'Evidencias/login/localsotage/storageState.json' });
    await page.screenshot({path: "Evidencias/login/localsotage/LoginlocalstorageClicado.png"}); 
    //await page.close();
    }