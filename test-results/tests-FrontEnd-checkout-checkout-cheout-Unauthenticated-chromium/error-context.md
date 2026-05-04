# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\FrontEnd\checkout.spec.ts >> checkout >> cheout Unauthenticated
- Location: tests\FrontEnd\checkout.spec.ts:46:9

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('#msg')
Expected: "Please login to complete your order"
Received: "User not authenticated"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('#msg')
    4 × locator resolved to <div id="msg" class="" role="status"></div>
      - unexpected value ""
    5 × locator resolved to <div id="msg" role="status" class="error">User not authenticated</div>
      - unexpected value "User not authenticated"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - heading "Checkout - ECM Marketplace" [level=1] [ref=e3]
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
    - heading "Your Cart" [level=2] [ref=e10]
    - table [ref=e11]:
      - rowgroup [ref=e12]:
        - row "ID Name Price" [ref=e13]:
          - columnheader "ID" [ref=e14]
          - columnheader "Name" [ref=e15]
          - columnheader "Price" [ref=e16]
      - rowgroup [ref=e17]:
        - row "2 Mouse $79.50" [ref=e18]:
          - cell "2" [ref=e19]
          - cell "Mouse" [ref=e20]
          - cell "$79.50" [ref=e21]
    - 'heading "Total: $79.50" [level=3] [ref=e23]'
    - button "Complete Order" [ref=e24] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect, webkit } from '@playwright/test';
  2  | import { NavegationPage } from './navegationPage';
  3  | 
  4  | 
  5  | test.beforeEach(async ({ page }) => {
  6  |      const browser = await webkit.launch();
  7  |          const context = await browser.newContext();
  8  |          await page.goto('http://localhost:8080/');
  9  |          await expect(page).toHaveURL('http://localhost:8080/');
  10 |          await page.screenshot({path: "Evidencias/Checkout/BeforeEach.png"});
  11 |   });
  12 | 
  13 | test.describe.parallel('checkout', () => {
  14 | 
  15 |     test('cheout Authenticated', async ({ page }) => {
  16 |         const navigationPage = new NavegationPage(page);
  17 |         await navigationPage.loginPage();
  18 |         await page.locator('#username').fill('valid_user');
  19 |         await page.locator('#password').fill('secret123');
  20 |         const btnLogin = await page.locator('#btnLogin').isDisabled();
  21 |         if (btnLogin === true) {
  22 |             console.log('O botão de login está desabilitado, verifique os campos de preenchimento');
  23 |         }
  24 |         else {
  25 |             await page.locator('#btnLogin').click();
  26 |         }
  27 |         const adicionar = await page.locator('[data-id="2"]').isDisabled();
  28 |         if (adicionar === true) {
  29 |             console.log('O botão de adicionar ao carrinho está desabilitado, verifique os campos de preenchimento');
  30 |         }
  31 |         else {
  32 |             await page.click('[data-id="2"]');
  33 |         }
  34 |         await navigationPage.checkoutPage();
  35 |         await page.screenshot({path: "Evidencias/checkout/CheckoutProdutoCorreto.png"});
  36 |         const btnfinish = await page.locator('#btnFinish').isDisabled();
  37 |         if (btnfinish === true) {
  38 |             console.log('O botão de finalizar pedido está desabilitado, verifique os campos de preenchimento');
  39 |         }
  40 |         else {
  41 |             await page.click('#btnFinish');
  42 |         }
  43 |         await page.screenshot({path: "Evidencias/checkout/CheckoutProdutoBotaoCompleteOrder.png"});
  44 |     });
  45 | 
  46 |     test('cheout Unauthenticated', async ({ page }) => {
  47 |         const navigationPage = new NavegationPage(page);
  48 |         await navigationPage.productsPage();
  49 |         await page.click('[data-id="2"]');
  50 |         await page.screenshot({path: "Evidencias/checkout/CheckoutProdutoCorreto2.png"});
  51 |         //await page.locator('[data-id="2"]').click();
  52 |         await navigationPage.checkoutPage();
  53 |         const btnfinish = await page.locator('#btnFinish').isDisabled();
  54 |         if (btnfinish === true) {
  55 |             console.log('O botão de finalizar pedido está desabilitado, verifique os campos de preenchimento');
  56 |         }
  57 |         else {
  58 |             await page.click('#btnFinish');
> 59 |         }   await expect(page.locator('#msg')).toHaveText('Please login to complete your order');
     |                                                ^ Error: expect(locator).toHaveText(expected) failed
  60 |         //await page.locator('#btnFinish').click();
  61 |         await page.screenshot({path: "Evidencias/checkout/CheckoutProdutoBotaoCompleteOrder2.png"});
  62 |         
  63 |     });
  64 | 
  65 | });
```