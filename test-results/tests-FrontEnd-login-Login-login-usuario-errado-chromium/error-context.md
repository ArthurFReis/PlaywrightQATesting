# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\FrontEnd\login.spec.ts >> Login >> login usuario errado
- Location: tests\FrontEnd\login.spec.ts:23:9

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('#msg')
Expected: "Invalid credentials"
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
        - textbox "Username:" [ref=e14]: valid
      - generic [ref=e15]:
        - generic [ref=e16]: "Password:"
        - textbox "Password:" [ref=e17]: secret123
      - button "Login" [ref=e18] [cursor=pointer]
    - generic [ref=e19]:
      - strong [ref=e20]: "Test Credentials:"
      - text: "Username: valid_user"
      - text: "Password: secret123"
```

# Test source

```ts
  1  | import { test, expect, webkit } from '@playwright/test';
  2  | import { NavegationPage } from './navegationPage';
  3  | import { realizarLogin } from '../../app/Comum/Login/login';
  4  | import { localStorageLogin } from '../../app/Comum/Login/login';
  5  | 
  6  | 
  7  | 
  8  | test.beforeEach(async ({ request, page }) => {
  9  | 
  10 |     const browser = await webkit.launch();
  11 |     const context = await browser.newContext();
  12 |     await page.goto('http://localhost:8080/login.html');
  13 |     await page.screenshot({path: "Evidencias/login/BeforeEach.png"});
  14 |     //await browser.close();
  15 |   });
  16 | 
  17 | test.describe.parallel('Login', () => {
  18 |     
  19 |     test('login correto', async ({ page }) => {
  20 |        await realizarLogin(page);  
  21 |     });
  22 | 
  23 |     test('login usuario errado', async ({ page }) => {
  24 |         let errors = {"user": ["valid", "invalid", "user1", ""], "password": "secret123", "msn": ["ms1", "ms2", "ms3", "ms4"], "dados": ["dados1", "dados2", "dados3", "dados4"]};
  25 |         const navigationPage = new NavegationPage(page);
  26 |         await navigationPage.loginPage();
  27 |         for (const error in errors.user) {
  28 |             await page.locator('#username').fill(errors.user[error]);
  29 |             await page.locator('#password').fill(errors.password);
  30 |             await page.screenshot({path: `Evidencias/login/UsuarioErrado/Preenchimento${errors.dados[error]}.png`});      
  31 |             await page.locator('#btnLogin').click();
> 32 |             await expect(page.locator('#msg')).toHaveText('Invalid credentials', {timeout:600});
     |                                                ^ Error: expect(locator).toHaveText(expected) failed
  33 |             await page.screenshot({path: `Evidencias/login/UsuarioErrado/PreenchimentoMessage${errors.msn[error]}.png`});
  34 |         }
  35 |     });
  36 | 
  37 |     test('login password errado', async ({ page }) => {
  38 |         let errors = {"password": ["secret1", "secret12", "secrect", ""], "user": "valid_user", "msn": ["ms1", "ms2", "ms3", "ms4"], "dados": ["dados1", "dados2", "dados3", "dados4"]};
  39 |         const navigationPage = new NavegationPage(page);
  40 |         await navigationPage.loginPage();
  41 |         for (const error in errors.password) {
  42 |             await page.locator('#username').fill(errors.user);
  43 |             await page.locator('#password').fill(errors.password[error]);
  44 |             await page.screenshot({path: `Evidencias/login/PasswordErrado/Preenchimento${errors.dados[error]}.png`});      
  45 |             await page.locator('#btnLogin').click();
  46 |             await expect(page.locator('#msg')).toHaveText('Invalid credentials', {timeout:600});
  47 |             await page.screenshot({path: `Evidencias/login/PasswordErrado/PreenchimentoMessage${errors.msn[error]}.png`});
  48 |         }
  49 |         
  50 |     });
  51 | test('login localstorage', async ({ page }) => {
  52 |     await localStorageLogin(page);
  53 |     }); 
  54 | 
  55 | });
```