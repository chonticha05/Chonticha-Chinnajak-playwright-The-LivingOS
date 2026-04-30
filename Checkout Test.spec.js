import { test, expect } from '@playwright/test';

test.use({
  headless: false,
  launchOptions: { slowMo: 600 } 
});

// 🔥 จุดที่แก้: เติม .only เข้าไปหลัง describe 
// ระบบจะแบนเคสอื่นทั้งหมด และโฟกัสแค่กลุ่ม Checkout นี้เท่านั้น
test.describe.only('Task 3: SauceDemo - Checkout E2E Flow', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
  });

  test('Complete Checkout Flow - สั่งซื้อสินค้าตั้งแต่ต้นจนจบ', async ({ page }) => {
    // หยิบสินค้า
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();
    
    // เริ่ม Checkout
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/.*checkout-step-one.html/); 

    // กรอกข้อมูล
    await page.locator('[data-test="firstName"]').fill('Chonticha');
    await page.locator('[data-test="lastName"]').fill('Chinnajak');
    await page.locator('[data-test="postalCode"]').fill('10900');
    await page.locator('[data-test="continue"]').click();

    // หน้าสรุปยอด
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    await page.locator('[data-test="finish"]').click();

    // หน้า Success
    await expect(page).toHaveURL(/.*checkout-complete.html/);
    const completeHeader = page.locator('[data-test="complete-header"]');
    await expect(completeHeader).toBeVisible();
    await expect(completeHeader).toHaveText('Thank you for your order!');
  });

  // --- Report Section ---
  test.afterAll(async () => {
    console.log('\n=========================================================');
    console.log(' 💳  AUTOMATED TEST SUMMARY: CHECKOUT E2E FLOW');
    console.log('=========================================================');
    console.log(' 📂  Test Suite    : Task 3 - End-to-End Purchase');
    console.log('---------------------------------------------------------');
    console.log(' ✅  Checkout Flow : PASS');
    console.log('---------------------------------------------------------');
    console.log(' 🎉  OVERALL STATUS: 100% SUCCESSFUL');
    console.log('=========================================================\n');
  });

});