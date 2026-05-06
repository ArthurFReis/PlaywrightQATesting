# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\FrontEnd\checkout.spec.ts >> checkout >> cheout Authenticated
- Location: tests\FrontEnd\checkout.spec.ts:19:9

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('#msg')
Expected: "Login successful"
Received: ""
Timeout:  600ms

Call log:
  - Expect "toHaveText" with timeout 600ms
  - waiting for locator('#msg')
    4 × locator resolved to <div id="msg" class="" role="alert"></div>
      - unexpected value ""

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
  2  | 
  3  | // Função exportada que pode ser usada em qualquer lugar
  4  | export async function realizarLogin(page: Page) {
  5  |   await page.fill('#username', 'valid_user');
  6  |         await page.locator('#username').fill('valid_user');
  7  |         await page.fill('#password',  'secret123');
  8  |         await page.screenshot({path: "Evidencias/login/PreenchimentoCorretoAmbos.png"});
  9  |         const btnLogin = await page.locator('#btnLogin').isDisabled();
  10 |         if (btnLogin === true) {
  11 |             console.log('O botão de login está desabilitado, verifique os campos de preenchimento');
  12 |         }
  13 |         else {
  14 |             await page.locator('#btnLogin').click();
> 15 |             await expect(page.locator('#msg')).toHaveText('Login successful', {timeout:600});
     |                                                ^ Error: expect(locator).toHaveText(expected) failed
  16 |         }
  17 |         //await page.locator('#btnLogin').click();
  18 |         await page.screenshot({path: "Evidencias/login/LoginProductsCorreto.png"});
  19 |     }
  20 | 
  21 |     export async function localStorageLogin(page: Page) {
  22 |         await page.evaluate(() => {
  23 |         localStorage.setItem('username', 'valid_user');
  24 |         localStorage.setItem('password', 'secret123');
  25 |     });
  26 | 
  27 |     let username: any =  "Hello";
  28 |     let password: any =  "xpto";
  29 |     
  30 |      username = await page.evaluate(() => localStorage.getItem('username'));
  31 |      password = await page.evaluate(() => localStorage.getItem('password'));
  32 |     
  33 |     await page.getByLabel('Username:').fill(username);
  34 |     await page.getByLabel('Password:').fill(password);   
  35 |     await page.screenshot({path: "Evidencias/login/localsotage/LoginlocalstoragePreenchido.png"});
  36 |     await page.locator('#btnLogin').click();
  37 |     await expect(page.locator('#msg')).toHaveText('Login successful', {timeout: 600});
  38 |     await page.context().storageState({ path: 'Evidencias/login/localsotage/storageState.json' });
  39 |     await page.screenshot({path: "Evidencias/login/localsotage/LoginlocalstorageClicado.png"}); 
  40 |     //await page.close();
  41 |     }
```