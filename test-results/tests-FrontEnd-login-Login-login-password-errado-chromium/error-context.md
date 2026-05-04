# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\FrontEnd\login.spec.ts >> Login >> login password errado
- Location: tests\FrontEnd\login.spec.ts:44:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#btnLogin')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - heading "Products - ECM Marketplace" [level=1] [ref=e3]
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
    - heading "Product Catalog" [level=2] [ref=e10]
    - generic [ref=e11]:
      - text: "Cart:"
      - strong [ref=e12]: "0"
      - text: items
    - textbox "Search products by name..." [ref=e14]
    - table [ref=e15]:
      - rowgroup [ref=e16]:
        - row "ID Name Price Actions" [ref=e17]:
          - columnheader "ID" [ref=e18]
          - columnheader "Name" [ref=e19]
          - columnheader "Price" [ref=e20]
          - columnheader "Actions" [ref=e21]
      - rowgroup [ref=e22]:
        - row "1 Keyboard $120.90 Add to Cart" [ref=e23]:
          - cell "1" [ref=e24]
          - cell "Keyboard" [ref=e25]
          - cell "$120.90" [ref=e26]
          - cell "Add to Cart" [ref=e27]:
            - button "Add to Cart" [ref=e28] [cursor=pointer]
        - row "2 Mouse $79.50 Add to Cart" [ref=e29]:
          - cell "2" [ref=e30]
          - cell "Mouse" [ref=e31]
          - cell "$79.50" [ref=e32]
          - cell "Add to Cart" [ref=e33]:
            - button "Add to Cart" [ref=e34] [cursor=pointer]
        - row "3 Monitor $1299.00 Add to Cart" [ref=e35]:
          - cell "3" [ref=e36]
          - cell "Monitor" [ref=e37]
          - cell "$1299.00" [ref=e38]
          - cell "Add to Cart" [ref=e39]:
            - button "Add to Cart" [ref=e40] [cursor=pointer]
        - row "4 Headset $240.00 Add to Cart" [ref=e41]:
          - cell "4" [ref=e42]
          - cell "Headset" [ref=e43]
          - cell "$240.00" [ref=e44]
          - cell "Add to Cart" [ref=e45]:
            - button "Add to Cart" [ref=e46] [cursor=pointer]
        - row "5 Webcam $320.00 Add to Cart" [ref=e47]:
          - cell "5" [ref=e48]
          - cell "Webcam" [ref=e49]
          - cell "$320.00" [ref=e50]
          - cell "Add to Cart" [ref=e51]:
            - button "Add to Cart" [ref=e52] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect, webkit } from '@playwright/test';
  2  | import { NavegationPage } from './navegationPage';
  3  | import { LoginPage } from './loginPage';
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
  17 |     test('login correto', async ({  page }) => {
  18 |         const loginPage = new LoginPage(page);
  19 |         await loginPage.login('valid_user', 'secret123');
  20 |         //await page.fill('#username', 'valid_user');
  21 |        // await page.locator('#username').fill('valid_user');
  22 |         //await page.fill('#password',  'secret123');
  23 |         //await page.screenshot({path: "Evidencias/login/PreenchimentoCorretoAmbos.png"});
  24 |         //await page.click('#btnLogin');
  25 |         //await page.locator('#btnLogin').click();
  26 |         await page.screenshot({path: "Evidencias/login/LoginProductsCorreto.png"});
  27 |         
  28 |         
  29 |     });
  30 | 
  31 |     test('login usuario errado', async ({ page }) => {
  32 |         let errors: any = {"user": ["valid", "invalid", "user1", ""], "password": "secret123", "msn": ["ms1", "ms2", "ms3", "ms4"], "dados": ["dados1", "dados2", "dados3", "dados4"]};
  33 |         const loginPage = new LoginPage(page);
  34 |         await loginPage.login('valid_user', 'secret123');
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
  46 |         const loginPage = new LoginPage(page);
  47 |         await loginPage.login('valid_user', 'secret123');
  48 |         for (const error in errors.password) {
  49 |             await page.locator('#username').fill(errors.user);
  50 |             await page.locator('#password').fill(errors.password[error]);
  51 |             await page.screenshot({path: `Evidencias/login/PasswordErrado/Preenchimento${errors.dados[error]}.png`});      
> 52 |             await page.locator('#btnLogin').click();
     |                                             ^ Error: locator.click: Test timeout of 30000ms exceeded.
  53 |             await page.screenshot({path: `Evidencias/login/PasswordErrado/PreenchimentoMessage${errors.msn[error]}.png`});
  54 |         }
  55 |         
  56 |     });
  57 | test('login localstorage', async ({ page }) => {
  58 | 
  59 |     const loginPage = new LoginPage(page);
  60 |     await loginPage.login('valid_user', 'secret123');
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