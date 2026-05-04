# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\FrontEnd\login.spec.ts >> Login >> login correto
- Location: tests\FrontEnd\login.spec.ts:17:9

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('#btnLogin')
    - locator resolved to <button disabled type="submit" id="btnLogin">Login</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
      - waiting 100ms
    3 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
      - waiting 500ms
  - element was detached from the DOM, retrying
    - waiting for" http://localhost:8080/products.html" navigation to finish...
    - navigated to "http://localhost:8080/products.html"

```

# Test source

```ts
  1  | import { test, expect, webkit } from '@playwright/test';
  2  | import { NavegationPage } from './navegationPage';
  3  | 
  4  | 
  5  | 
  6  | test.beforeEach(async ({ request, page }) => {
  7  | 
  8  |     const browser = await webkit.launch();
  9  |     const context = await browser.newContext();
  10 |     await page.goto('http://localhost:8080/login.html');
  11 |     await page.screenshot({path: "Evidencias/login/BeforeEach.png"});
  12 |     //await browser.close();
  13 |   });
  14 | 
  15 | test.describe.parallel('Login', () => {
  16 | 
  17 |     test('login correto', async ({ request, page }) => {
  18 |         const navigationPage = new NavegationPage(page);
  19 |         await navigationPage.loginPage();
  20 |         await page.fill('#username', 'valid_user');
  21 |         await page.locator('#username').fill('valid_user');
  22 |         await page.fill('#password',  'secret123');
  23 |         await page.screenshot({path: "Evidencias/login/PreenchimentoCorretoAmbos.png"});
  24 |         await page.click('#btnLogin');
> 25 |         await page.locator('#btnLogin').click();
     |                                         ^ Error: locator.click: Target page, context or browser has been closed
  26 |         await page.screenshot({path: "Evidencias/login/LoginProductsCorreto.png"});
  27 |         
  28 |         
  29 |     });
  30 | 
  31 |     test('login usuario errado', async ({ page }) => {
  32 |         let errors: any = {"user": ["valid", "invalid", "user1", ""], "password": "secret123", "msn": ["ms1", "ms2", "ms3", "ms4"], "dados": ["dados1", "dados2", "dados3", "dados4"]};
  33 |         const navigationPage = new NavegationPage(page);
  34 |         await navigationPage.loginPage();
  35 |         for (const error in errors.user) {
  36 |             await page.locator('#username').fill(errors.user[error]);
  37 |             await page.locator('#password').fill(errors.password);
  38 |             await page.screenshot({path: `Evidencias/login/UsuarioErrado/Preenchimento${errors.dados[error]}.png`});      
  39 |             await page.locator('#btnLogin').click();
  40 |             await page.screenshot({path: `Evidencias/login/UsuarioErrado/PreenchimentoMessage${errors.msn[error]}.png`});
  41 |         }
  42 |     });
  43 | 
  44 |     test('login password errado', async ({ page }) => {
  45 |         let errors: any = {"password": ["secret1", "secret12", "secrect", ""], "user": "valid_user", "msn": ["ms1", "ms2", "ms3", "ms4"], "dados": ["dados1", "dados2", "dados3", "dados4"]};
  46 |         const navigationPage = new NavegationPage(page);
  47 |         await navigationPage.loginPage();
  48 |         for (const error in errors.password) {
  49 |             await page.locator('#username').fill(errors.user);
  50 |             await page.locator('#password').fill(errors.password[error]);
  51 |             await page.screenshot({path: `Evidencias/login/PasswordErrado/Preenchimento${errors.dados[error]}.png`});      
  52 |             await page.locator('#btnLogin').click();
  53 |             await page.screenshot({path: `Evidencias/login/PasswordErrado/PreenchimentoMessage${errors.msn[error]}.png`});
  54 |         }
  55 |         
  56 |     });
  57 | test('login localstorage', async ({ page }) => {
  58 | 
  59 |     const navigationPage = new NavegationPage(page);
  60 |     await navigationPage.loginPage();
  61 | 
  62 |     await page.evaluate(() => {
  63 |         localStorage.setItem('username', 'valid_user');
  64 |         localStorage.setItem('password', 'secret123');
  65 | 
  66 |     });
  67 |     let username: any = 'hello';
  68 |     let password: any = 'hi';
  69 | 
  70 |      username = await page.evaluate(() => localStorage.getItem('username'));
  71 |      password = await page.evaluate(() => localStorage.getItem('password'));
  72 |     
  73 |     await page.getByLabel('Username:').fill(username);
  74 |     await page.getByLabel('Password:').fill(password);   
  75 |     await page.screenshot({path: "Evidencias/login/localsotage/LoginlocalstoragePreenchido.png"});
  76 |     await page.locator('#btnLogin').click();
  77 |     await page.context().storageState({ path: 'Evidencias/login/localsotage/storageState.json' });
  78 |     await page.screenshot({path: "Evidencias/login/localsotage/LoginlocalstorageClicado.png"});  
  79 |     
  80 |     await page.close();
  81 |     });
  82 | 
  83 |     
  84 | 
  85 | });
```