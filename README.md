ECM Marketplace - QA Automation Test App
A minimal web application designed for QA automation practice with Selenium, Playwright, or similar testing frameworks.
Purpose
This application serves as an Application Under Test (AUT) for practicing UI automation. It includes:
Intentional async delays to practice explicit waits
localStorage-based authentication and cart management
Stable element IDs for reliable test locators
Multiple user flows for comprehensive test scenarios
Project Structure
```
.
├── app/
│   ├── index.html      # Home page with navigation
│   ├── login.html      # Login page with authentication
│   ├── products.html   # Product catalog with search and cart
│   └── checkout.html   # Checkout page with order completion
├── server/
│   └── server.js       # Simple static HTTP server
├── package.json        # Project configuration
└── README.md          # This file
```
How to Run
Option 1: Node.js Server (Recommended)
Install dependencies (none required, but run for future compatibility):
```bash
   npm install
   ```
Start the server:
```bash
   npm start
   ```
Open your browser and navigate to:
```
   http://localhost:8080
   ```
Option 2: Python Simple Server (Alternative)
Navigate to the app directory:
```bash
   cd app
   ```
Start Python's built-in HTTP server:
```bash
   python3 -m http.server 8080
   ```
Open your browser and navigate to:
```
   http://localhost:8080
   ```
Test Automation Notes
Intentional Delays (Explicit Waits Required)
The application includes intentional delays to simulate real-world async operations:
Login: 600ms delay after clicking login button
Product Search: 400ms delay after typing in search field
Checkout: 500ms delay after clicking complete order button
Important: Your tests must use explicit waits (e.g., `WebDriverWait` in Selenium, `waitFor` in Playwright) to handle these delays properly.
localStorage Keys
The application uses browser localStorage for state management:
`auth`: String value `'true'` when user is authenticated
`cart`: JSON array of product objects added to cart
Element Locators
All interactive elements have stable IDs for reliable test automation:
Navigation (index.html):
`#nav-login` - Link to login page
`#nav-products` - Link to products page
`#nav-checkout` - Link to checkout page
Login Page (login.html):
`#username` - Username input field
`#password` - Password input field
`#btnLogin` - Login button
`#msg` - Status message container (role="alert")
Products Page (products.html):
`#q` - Search input field
`#tbl-products` - Products table
`#tbody` - Table body with product rows
`.btn-add` - Add to cart buttons (with `data-id` attribute)
`#cart-count` - Cart item count display
Checkout Page (checkout.html):
`#tbl-cart` - Cart items table
`#tbody` - Table body with cart items
`#total` - Total price display
`#btnFinish` - Complete order button
`#msg` - Status message container (role="status")
Test Credentials
Username: `valid_user`
Password: `secret123`
Product Database
The application has 5 fixed products:
Keyboard - R$120.90
Mouse - R$79.50
Monitor - R$1299.00
Headset - R$240.00
Webcam - R$320.00
Suggested Page Object Model (POM)
Consider creating these page classes:
`LoginPage` - Handle login operations
`ProductsPage` - Handle product search and cart operations
`CheckoutPage` - Handle checkout and order completion
Example Test Flows
Successful Login Flow:
Navigate to login page
Enter valid credentials
Click login button
Wait for success message (600ms delay)
Verify redirect to products page
Failed Login Flow:
Navigate to login page
Enter invalid credentials
Click login button
Wait for error message (600ms delay)
Verify error message displayed
Product Search Flow:
Navigate to products page
Enter search term in search field
Wait for filtered results (400ms delay)
Verify correct products displayed
Add to Cart Flow:
Navigate to products page
Click "Add to Cart" for a product
Verify cart count increases
Verify localStorage cart updated
Authenticated Checkout Flow:
Login with valid credentials
Add products to cart
Navigate to checkout page
Click "Complete Order"
Wait for success message (500ms delay)
Verify order placed and cart cleared
Unauthenticated Checkout Flow:
Clear localStorage (logout)
Add products to cart
Navigate to checkout page
Click "Complete Order"
Wait for error message (500ms delay)
Verify authentication error displayed
Browser Compatibility
This application is compatible with modern browsers:
Chrome/Chromium (recommended for automation)
Firefox
Edge
Safari
Notes for Test Automation Engineers
All pages use semantic HTML for better accessibility and testability
JavaScript is embedded in HTML files for simplicity
No external dependencies or frameworks required
The application is stateless on the server side (all state in localStorage)
Perfect for practicing explicit waits, POM patterns, and data-driven testing
Can be used with any UI automation framework (Selenium, Playwright, Cypress, etc.)
License
MIT
