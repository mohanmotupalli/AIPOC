# Saucedemo Checkout Test Plan

## Overview
This test plan covers the full checkout workflow for the Sauce Demo application using the user story in `user-stories/SCRUM-101-E-commerce-Checkout-Process.md`.

## Scope
- Validate cart review and checkout flow
- Validate checkout information form behavior and required field validation
- Validate order overview details, payment/shipping summary, and totals
- Validate order completion and confirmation
- Validate error handling for invalid or missing checkout data
- Validate cancel/back navigation during checkout

## Application
- URL: https://www.saucedemo.com
- Test credentials:
  - Username: `standard_user`
  - Password: `secret_sauce`

## Test Data
- First Name: `Test`
- Last Name: `User`
- Zip/Postal Code: `12345`

## Test Cases

### TC-01: Login and Add Items to Cart
1. Go to `https://www.saucedemo.com`
2. Enter username `standard_user`
3. Enter password `secret_sauce`
4. Click `Login`
5. Add the first available product to cart
6. Open the shopping cart

**Expected Results:**
- User is logged in successfully
- At least one product is visible in the cart
- Product details include name, description, price, and quantity
- Cart badge updates to show the number of items

---

### TC-02: Cart Review and Proceed to Checkout
1. From the cart page, verify each cart item detail
2. Verify the total price is displayed
3. Click `Checkout`

**Expected Results:**
- Cart page shows all selected items with correct information
- Total price is visible
- Clicking `Checkout` navigates to the Checkout Information page

---

### TC-03: Checkout Information Required Fields Validation
1. On the Checkout Information page, leave `First Name` empty
2. Enter `Last Name` and `Zip/Postal Code`
3. Click `Continue`
4. Repeat for each empty required field: `Last Name`, `Zip/Postal Code`

**Expected Results:**
- The system shows an error message for the missing required field
- The user cannot proceed until all required fields are filled
- Error messages identify the specific missing field

---

### TC-04: Checkout Information Success
1. On the Checkout Information page, enter valid values for all fields
   - `First Name`: `Test`
   - `Last Name`: `User`
   - `Zip/Postal Code`: `12345`
2. Click `Continue`

**Expected Results:**
- The application navigates to the Checkout Overview page
- User sees shipping address and payment information summary
- The selected items are listed with name, description, quantity, and price
- Subtotal, tax, and total amount are displayed

---

### TC-05: Order Overview and Finish Order
1. On the Checkout Overview page, review all order details
2. Confirm the item list, shipping info, and price summary
3. Click `Finish`

**Expected Results:**
- The application navigates to the Order Confirmation page
- A success message is displayed confirming the order
- A `Back Home` button is visible
- Order summary or confirmation content is present

---

### TC-06: Order Completion Navigation
1. On the Order Confirmation page, click `Back Home`

**Expected Results:**
- User is redirected back to the products page
- The cart is empty after order completion
- The products page loads successfully

---

### TC-07: Checkout Cancellation
1. On the Checkout Information page, click `Cancel`
2. Confirm the user returns to the cart page
3. On the Checkout Overview page, click `Cancel`

**Expected Results:**
- Both cancel actions return the user to the cart page
- The cart contents remain intact after cancellation
- The user can restart checkout from the cart page

---

### TC-08: Invalid Data Validation
1. On the Checkout Information page, enter invalid values such as special characters in required fields
2. Click `Continue`

**Expected Results:**
- Appropriate validation error messages are shown for invalid input
- The user cannot proceed until the data is corrected
- The checkout process remains on the Checkout Information page

---

## Test Coverage
- AC1: Cart Review
- AC2: Checkout Information Entry and validation
- AC3: Order Overview content and totals
- AC4: Order Completion confirmation
- AC5: Error Handling for missing/invalid input

## Notes
- If any page or element is not available, capture the failure details and screenshots.
- Use stable selectors such as element roles, visible labels, and data-test attributes when automating.
- Keep the checkout flow test cases independent and repeatable.
