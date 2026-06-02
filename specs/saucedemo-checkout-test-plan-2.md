# SauceDemo Checkout Test Plan (Run 2)

## Overview
This test plan covers the e-commerce checkout process for Sauce Demo using the user story in `user-stories/SCRUM-101-E-commerce-Checkout-Process.md`.

Application URL: https://www.saucedemo.com
Test credentials: `standard_user` / `secret_sauce`

## Scope
- Cart review and item details
- Checkout information entry and validation
- Order overview and summary validation
- Order completion confirmation
- Error handling and negative checkout scenarios
- Navigation and cancel behavior

## Acceptance Criteria Covered
- AC1: Cart Review
- AC2: Checkout Information Entry
- AC3: Order Overview
- AC4: Order Completion
- AC5: Error Handling

## Test Cases

### 1. Cart Review
**Title:** Verify cart review page shows added items and checkout options

**Preconditions:** User is logged in and has added items to the cart.

**Steps:**
1. Login with standard_user / secret_sauce.
2. Add at least two products to the cart.
3. Click the cart icon.

**Expected Results:**
- The cart page loads and shows all added items.
- Each item displays name, description, price, and quantity.
- The cart page shows buttons to continue shopping and proceed to checkout.

**Notes:** If the site does not display a cart total on the cart page, verify item prices and proceed to checkout for summary validation.

### 2. Checkout Information Entry
**Title:** Verify checkout information page requires all fields

**Preconditions:** User is on the cart page with items in cart.

**Steps:**
1. Click Checkout.
2. On the checkout information page, leave one or more fields empty.
3. Click Continue.

**Expected Results:**
- The checkout information page shows fields for First Name, Last Name, and Zip/Postal Code.
- If any field is empty, an error message indicates the missing field.
- The user cannot advance until each required field is complete.

### 3. Order Overview
**Title:** Verify checkout overview page displays order summary and totals

**Preconditions:** User has entered valid checkout information.

**Steps:**
1. Fill first name, last name, and zip code.
2. Click Continue.

**Expected Results:**
- The order overview page loads.
- The page shows a summary of all order items.
- Payment and shipping information is visible.
- Subtotal, tax, and total amounts are shown.
- Buttons to Cancel and Finish the order are available.

### 4. Order Completion
**Title:** Verify order confirmation after finishing checkout

**Preconditions:** User is on the order overview page.

**Steps:**
1. Click Finish.

**Expected Results:**
- The order confirmation page loads.
- The page displays a success message confirming the order.
- A Back Home button is visible to return to products.

### 5. Error Handling
**Title:** Verify checkout validation prevents incomplete data submission

**Preconditions:** User is on the checkout information page.

**Steps:**
1. Enter invalid or incomplete checkout information.
2. Click Continue.

**Expected Results:**
- Required field errors are shown for missing values.
- The user cannot proceed until required data is entered.
- If the application supports format validation, invalid values are rejected.

## Test Data
- Username: `standard_user`
- Password: `secret_sauce`
- First Name: `Test`
- Last Name: `User`
- Postal Code: `12345`

## Notes
- Use Playwright to automate the flow across Chromium, Firefox, and WebKit.
- Capture screenshots for failure states and key workflow transitions.
- Document any mismatches between acceptance criteria and actual UI behavior.
