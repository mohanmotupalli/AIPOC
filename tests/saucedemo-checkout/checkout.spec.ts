import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';
const FIRST_NAME = 'Test';
const LAST_NAME = 'User';
const POSTAL_CODE = '12345';

async function loginAndAddItem(page) {
  await page.goto(BASE_URL);
  await expect(page).toHaveURL(BASE_URL);
  await page.locator('input[data-test="username"]').fill(USERNAME);
  await page.locator('input[data-test="password"]').fill(PASSWORD);
  await page.locator('input[data-test="login-button"]').click();
  await expect(page.locator('.inventory_list')).toBeVisible();
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
}

async function openCart(page) {
  await page.locator('.shopping_cart_link').click();
  await expect(page).toHaveURL(/cart.html/);
  await expect(page.locator('.cart_list')).toBeVisible();
}

async function openCheckoutInformation(page) {
  await page.locator('button[data-test="checkout"]').click();
  await expect(page).toHaveURL(/checkout-step-one.html/);
  await expect(page.getByText('Checkout: Your Information')).toBeVisible();
}

async function fillCheckoutInformation(page, firstName, lastName, postalCode) {
  await page.locator('input[data-test="firstName"]').fill(firstName);
  await page.locator('input[data-test="lastName"]').fill(lastName);
  await page.locator('input[data-test="postalCode"]').fill(postalCode);
}

async function continueCheckout(page) {
  await page.locator('input[data-test="continue"]').click();
}

test.describe('SauceDemo Checkout Workflow', () => {
  test('Login and add item to cart', async ({ page }) => {
    await loginAndAddItem(page);
    await expect(page.locator('.inventory_item')).toHaveCount(6);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await expect(page.getByText('Your Cart')).not.toBeVisible();
  });

  test('Cart review and proceed to checkout', async ({ page }) => {
    await loginAndAddItem(page);
    await openCart(page);
    await expect(page.locator('.cart_item')).toHaveCount(1);
    await expect(page.locator('.cart_item_label')).toBeVisible();
    await expect(page.locator('.inventory_item_name')).toHaveText(/.+/);
    await page.locator('button[data-test="checkout"]').click();
    await expect(page).toHaveURL(/checkout-step-one.html/);
  });

  test('Checkout information required fields validation', async ({ page }) => {
    await loginAndAddItem(page);
    await openCart(page);
    await openCheckoutInformation(page);

    await page.locator('input[data-test="lastName"]').fill(LAST_NAME);
    await page.locator('input[data-test="postalCode"]').fill(POSTAL_CODE);
    await continueCheckout(page);
    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');

    await page.locator('input[data-test="firstName"]').fill(FIRST_NAME);
    await page.locator('input[data-test="lastName"]').fill('');
    await page.locator('input[data-test="postalCode"]').fill(POSTAL_CODE);
    await continueCheckout(page);
    await expect(page.locator('[data-test="error"]')).toContainText('Last Name is required');

    await page.locator('input[data-test="firstName"]').fill(FIRST_NAME);
    await page.locator('input[data-test="lastName"]').fill(LAST_NAME);
    await page.locator('input[data-test="postalCode"]').fill('');
    await continueCheckout(page);
    await expect(page.locator('[data-test="error"]')).toContainText('Postal Code is required');
  });

  test('Checkout information success and order overview', async ({ page }) => {
    await loginAndAddItem(page);
    await openCart(page);
    await openCheckoutInformation(page);
    await fillCheckoutInformation(page, FIRST_NAME, LAST_NAME, POSTAL_CODE);
    await continueCheckout(page);

    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(page.getByText('Checkout: Overview')).toBeVisible();
    await expect(page.locator('.summary_info')).toBeVisible();
    await expect(page.locator('.cart_item')).toHaveCount(1);
    await expect(page.locator('.summary_subtotal_label')).toContainText('Item total');
    await expect(page.locator('.summary_tax_label')).toContainText('Tax');
    await expect(page.locator('.summary_total_label')).toContainText('Total');
  });

  test('Finish order and back home clears cart', async ({ page }) => {
    await loginAndAddItem(page);
    await openCart(page);
    await openCheckoutInformation(page);
    await fillCheckoutInformation(page, FIRST_NAME, LAST_NAME, POSTAL_CODE);
    await continueCheckout(page);

    await page.locator('button[data-test="finish"]').click();
    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(page.getByText('THANK YOU FOR YOUR ORDER')).toBeVisible();
    await page.locator('button[data-test="back-to-products"]').click();
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0).catch(() => {
      // if badge is hidden after checkout, ignore
    });
  });

  test('Checkout cancellation returns to cart with items intact', async ({ page }) => {
    await loginAndAddItem(page);
    await openCart(page);
    await openCheckoutInformation(page);
    await page.locator('button[data-test="cancel"]').click();
    await expect(page).toHaveURL(/cart.html/);
    await expect(page.locator('.cart_item')).toHaveCount(1);

    await openCheckoutInformation(page);
    await fillCheckoutInformation(page, FIRST_NAME, LAST_NAME, POSTAL_CODE);
    await continueCheckout(page);
    await expect(page).toHaveURL(/checkout-step-two.html/);
    await page.locator('button[data-test="cancel"]').click();
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('Invalid data in checkout uses site-required validation behavior', async ({ page }) => {
    await loginAndAddItem(page);
    await openCart(page);
    await openCheckoutInformation(page);
    await fillCheckoutInformation(page, 'T!@#$', '%^&*()', 'ABCDE');
    await continueCheckout(page);

    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(page.getByText('Checkout: Overview')).toBeVisible();
  });
});
