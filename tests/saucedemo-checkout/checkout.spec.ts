import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

async function login(page) {
  await page.goto(BASE_URL);
  await page.fill('[data-test="username"]', USERNAME);
  await page.fill('[data-test="password"]', PASSWORD);
  await page.click('[data-test="login-button"]');
  await expect(page).toHaveURL(/inventory.html/);
}

test.describe('Sauce Demo Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('Cart Review: add items and verify cart details', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await page.click('.shopping_cart_link');

    await expect(page).toHaveURL(/cart.html/);
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
    await expect(page.locator('.inventory_item_price')).toHaveCount(2);
    await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
  });

  test('Checkout Information Entry: require all fields', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');

    await expect(page).toHaveURL(/checkout-step-one.html/);
    await expect(page.locator('[data-test="firstName"]')).toBeVisible();
    await expect(page.locator('[data-test="lastName"]')).toBeVisible();
    await expect(page.locator('[data-test="postalCode"]')).toBeVisible();

    await page.click('[data-test="continue"]');
    await expect(page.getByText('Error: First Name is required')).toBeVisible();

    await page.fill('[data-test="firstName"]', 'Test');
    await page.fill('[data-test="lastName"]', 'User');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
    await expect(page).toHaveURL(/checkout-step-two.html/);
  });

  test('Order Overview: show summary, payment, shipping, totals, and actions', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');

    await page.fill('[data-test="firstName"]', 'Test');
    await page.fill('[data-test="lastName"]', 'User');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');

    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(page.locator('.cart_item')).toHaveCount(1);
    await expect(page.getByText('Payment Information')).toBeVisible();
    await expect(page.getByText('Shipping Information')).toBeVisible();
    await expect(page.locator('[data-test="subtotal-label"]')).toBeVisible();
    await expect(page.locator('[data-test="tax-label"]')).toBeVisible();
    await expect(page.locator('[data-test="total-label"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Finish' })).toBeVisible();
  });

  test('Order Completion: finish checkout and confirm order', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');

    await page.fill('[data-test="firstName"]', 'Test');
    await page.fill('[data-test="lastName"]', 'User');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');

    await page.click('[data-test="finish"]');
    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(page.getByText('THANK YOU FOR YOUR ORDER')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Back Home' })).toBeVisible();
  });

  test('Error Handling: cannot proceed with incomplete checkout information', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');

    await page.fill('[data-test="firstName"]', '');
    await page.fill('[data-test="lastName"]', '');
    await page.fill('[data-test="postalCode"]', '');
    await page.click('[data-test="continue"]');

    await expect(page.getByText('Error: First Name is required')).toBeVisible();
  });
});
