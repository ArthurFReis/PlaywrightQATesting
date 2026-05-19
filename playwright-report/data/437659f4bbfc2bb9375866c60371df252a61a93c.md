# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\FrontEnd\login.spec.ts >> Login >> login localstorage
- Location: tests\FrontEnd\login.spec.ts:67:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "Login successful"
Received: ""
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - heading "Login - ECM Marketplace" [level=1] [ref=e3]
  - navigation [ref=e4]:
    - link "Home" [ref=e5] [cursor=pointer]:
      - /url: index.html
    - link "Login" [ref=e6] [cursor=pointer]:
      - /url: login.html
    - link "Products" [ref=e7] [cursor=pointer]:
      - /url: products.html
    - link "Checkout" [ref=e8] [cursor=pointer]:
      - /url: checkout.html
  - generic [ref=e9]:
    - heading "Login" [level=2] [ref=e10]
    - generic [ref=e11]:
      - generic [ref=e12]:
        - generic [ref=e13]: "Username:"
        - textbox "Username:" [ref=e14]: valid_user
      - generic [ref=e15]:
        - generic [ref=e16]: "Password:"
        - textbox "Password:" [ref=e17]: secret123
      - button "Login" [disabled] [ref=e18]
    - generic [ref=e19]:
      - strong [ref=e20]: "Test Credentials:"
      - text: "Username: valid_user"
      - text: "Password: secret123"
```

# Test source

```ts
  1  | import { Page, expect } from '@playwright/test';    
  2  | import { NavegationPage } from '../../../tests/FrontEnd/navegationPage';
  3  | 
  4  | export async function realizarLogin(page: Page) {
  5  |     let navegationPage = new NavegationPage(page);
  6  |     let usuario =await navegationPage.username.isEditable();
  7  |     let senha = await navegationPage.password.isEditable();
  8  |     if (usuario === true && senha === true){
  9  |         await page.fill('#username', 'valid_user');
  10 |         await navegationPage.username.fill('valid_user');
  11 |         await navegationPage.password.fill('secret123');
  12 |         await page.screenshot({path: "Evidencias/login/PreenchimentoCorretoAmbos.png"});
  13 |         const btnLogin = await page.locator('#btnLogin').isDisabled();
  14 |         const btnLogin2 = await page.locator('#btnLogin2').isVisible()
  15 |         if (btnLogin === true && btnLogin2 === true) {
  16 |             console.log('O botão de login está desabilitado, verifique os campos de preenchimento');
  17 |         }
  18 |         else {
  19 |             await page.locator('#btnLogin').click();    
  20 |         }
  21 |         const tempo = await page.locator('#msg').innerText({timeout:600});
  22 |         console.log('Menssage recebida: \n ', tempo)
  23 |         await expect(tempo).toBe('Login successful');
  24 |         //await page.locator('#btnLogin').click();
  25 |         await page.screenshot({path: "Evidencias/login/LoginProductsCorreto.png"});
  26 |     }
  27 |     }
  28 | 
  29 |     export async function testeBotoesMenuLogin(page: Page) {
  30 |         let menuButtons = {"ids":['#nav-home', '#nav-login', '#nav-products', '#nav-checkout']};
  31 |       
  32 |         for( var id in menuButtons.ids){
  33 |           if((await page.locator(menuButtons.ids[id]).isEnabled()) && (await page.locator(menuButtons.ids[id]).isDisabled())){
  34 |             console.log("O botão está invisivel ou está desabilitado!")
  35 |           }
  36 |           else {
  37 |                await page.locator(menuButtons.ids[id]).click();
  38 |                await page.screenshot({path: `Evidencias/login/Menu/menu-${menuButtons.ids[id]}.png`});
  39 |           }
  40 |       }
  41 |         console.log("Todas as páginas estão funcionando! \n");
  42 | }
  43 | 
  44 |     export async function pageResponsivoLogin(page: Page) {
  45 |     let tamanhos = {"nomes": ["iPhone_SE", "iPhone_XR", "iPhone_12_Pro", "iPhone_14_Pro_Max"], "width": [375,414,390,430], "height": [667,896,844,932]};
  46 |     for(const tamanho in tamanhos.width){
  47 |       await page.setViewportSize({ width: tamanhos.width[tamanho], height: tamanhos.height[tamanho]});
  48 |       await page.screenshot({path: `Evidencias/login/Responsivo/home-mobile-${tamanhos.nomes[tamanho]}.png`});
  49 |     }
  50 |      console.log("É responsivo! \n");
  51 | }
  52 | 
  53 |     export async function localStorageLogin(page: Page) {
  54 |         await page.evaluate(() => {
  55 |         localStorage.setItem('username', 'valid_user');
  56 |         localStorage.setItem('password', 'secret123');
  57 |     });
  58 | 
  59 |     let username: any =  "Hello";
  60 |     let password: any =  "xpto";
  61 |     
  62 |      username = await page.evaluate(() => localStorage.getItem('username'));
  63 |      password = await page.evaluate(() => localStorage.getItem('password'));
  64 |     
  65 |     await page.getByLabel('Username:').fill(username);
  66 |     await page.getByLabel('Password:').fill(password);   
  67 |     await page.screenshot({path: "Evidencias/login/localsotage/LoginlocalstoragePreenchido.png"});
  68 |     await page.locator('#btnLogin').click();
  69 |     const tempo = await page.locator('#msg').innerText({timeout:600});
  70 |     console.log('Menssage recebida: \n', tempo)
> 71 |     await expect(tempo).toBe('Login successful');
     |                         ^ Error: expect(received).toBe(expected) // Object.is equality
  72 |     await page.context().storageState({ path: 'Evidencias/login/localsotage/storageState.json' });
  73 |     await page.screenshot({path: "Evidencias/login/localsotage/LoginlocalstorageClicado.png"}); 
  74 |     //await page.close();
  75 |     }
```