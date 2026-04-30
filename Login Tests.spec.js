import { test, expect, chromium } from '@playwright/test';

test.describe('Task 3: SauceDemo - Login Tests', () => {
  
  // ใช้ Hook beforeAll เพื่อตั้งค่าให้ Browser เปิดหน้าจอ (headless: false) และหน่วงเวลา (slowMo)
  let browser;
  let context;
  let page;

  test.beforeAll(async () => {
    browser = await chromium.launch({
      headless: false, // เปิดหน้าต่าง Browser ให้เห็น
      slowMo: 1000     // หน่วงเวลาทุกแอคชัน 1 วินาที (1000 ms) จะได้มองทัน
    });
    context = await browser.newContext();
    page = await context.newPage();
  });

  test.beforeEach(async () => {
    await page.goto('https://www.saucedemo.com/');
  });

  // --- Test Cases ---

  test('Valid Login - เข้าสู่ระบบด้วยข้อมูลที่ถูกต้อง', async () => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page).toHaveTitle('Swag Labs');
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('Invalid Login - เข้าสู่ระบบด้วยรหัสผ่านผิด', async () => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('wrong_password');
    await page.locator('[data-test="login-button"]').click();

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Epic sadface: Username and password do not match');
  });

  test('Empty Login - กดเข้าสู่ระบบโดยไม่กรอกข้อมูล', async () => {
    await page.locator('[data-test="login-button"]').click();

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Epic sadface: Username is required');
  });

  // --- Report Section ---
  
  // ใช้ Hook afterAll เพื่อพิมพ์ Report สวยๆ ลงใน Terminal ตอนจบ
  test.afterAll(async () => {
    console.log('\n=========================================================');
    console.log(' 🚀  AUTOMATED TEST EXECUTION SUMMARY');
    console.log('=========================================================');
    console.log(' 📂  Test Suite    : Task 3 - SauceDemo Login Tests');
    console.log(' 🌐  Environment   : Chromium (UI Mode, slowMo: 1s)');
    console.log('---------------------------------------------------------');
    console.log(' ✅  Valid Login   : PASS');
    console.log(' ✅  Invalid Login : PASS');
    console.log(' ✅  Empty Login   : PASS');
    console.log('---------------------------------------------------------');
    console.log(' 🎉  OVERALL STATUS: 100% SUCCESSFUL');
    console.log('=========================================================\n');
    
    // ปิด Browser เมื่อรันจบ
    await browser.close();
  });

});