# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\Backend\loginBackEnd.spec.ts >> API com paralelo >> Backend erro no login
- Location: tests\Backend\loginBackEnd.spec.ts:17:10

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 400
Received: 200
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe.parallel("API com paralelo", () => {
  4  |   test("Login correto", async ({ request, page }) => {
  5  | 
  6  |     const site = 'http://localhost:8080/';
  7  |       const response =    await request.get(`${site}/login.html`, {
  8  |     form: {
  9  |       'username': 'valid_user',
  10 |       'password': 'secret123'
  11 |     }
  12 |   });
  13 |   expect(response.status()).toBe(200);
  14 | 
  15 |     });
  16 | 
  17 |      test("Backend erro no login", async ({ request, page }) => {
  18 | 
  19 |     const site = 'http://localhost:8080/';
  20 |       const response =    await request.get(`${site}/login.html`, {
  21 |     form: {
  22 |       'username': 'valid_user',
  23 |       'password': 'secret123'
  24 |     }
  25 |   });
> 26 |   expect(response.status()).toBe(400);
     |                             ^ Error: expect(received).toBe(expected) // Object.is equality
  27 | 
  28 |     });
  29 | 
  30 |     test("Backend erro no usuário do login", async ({ request, page }) => {
  31 | 
  32 |     const site = 'http://localhost:8080/';
  33 |       const response =    await request.get(`${site}/login.html`, {
  34 |     form: {
  35 |       'username': 'valid',
  36 |       'password': 'secret123'
  37 |     }
  38 |   });
  39 |   expect(response.status()).toBe(200);
  40 | 
  41 |     });
  42 | });
```