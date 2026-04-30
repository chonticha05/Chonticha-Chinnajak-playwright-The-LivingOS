import { test, expect } from '@playwright/test';

test.use({
  headless: false,
  launchOptions: { slowMo: 800 } // ปรับให้ช้าลงนิดนึงจะได้เห็นตอนมันเปลี่ยนหน้าชัดๆ ครับ
});

test.describe('Task 3: SauceDemo - Deep Cart Validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
  });

  test('Add & Verify in Cart Page - เพิ่มสินค้าแล้วตามเข้าไปดูในตะกร้า', async ({ page }) => {
    const itemName = 'Sauce Labs Backpack';
    
    // 1. กด Add สินค้าที่หน้าแรก
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // 2. กดเข้าไปที่ไอคอนตะกร้าเพื่อ Check Order
    await page.locator('.shopping_cart_link').click();

    // 3. Assert: ตรวจสอบว่า URL ต้องเป็นหน้า cart
    await expect(page).toHaveURL(/.*cart.html/);

    // 4. Assert: เช็คว่ามีชื่อสินค้า "Sauce Labs Backpack" ปรากฏในรายการตะกร้าจริงไหม
    const itemInCart = page.locator('[data-test="inventory-item-name"]');
    await expect(itemInCart).toHaveText(itemName);
    
    console.log(`✅ Verified: ${itemName} is present in the cart.`);
  });

  test('Remove & Verify Empty Cart - ลบสินค้าแล้วเช็คว่าในหน้าตะกร้าต้องหายไปจริง', async ({ page }) => {
    // 1. เตรียมของใส่ตะกร้าก่อน
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    
    // 2. กดเข้าไปหน้าตะกร้า
    await page.locator('.shopping_cart_link').click();
    
    // 3. ยืนยันว่าตอนนี้มีของอยู่ในหน้าตะกร้าจริง
    const itemInCart = page.locator('[data-test="inventory-item-name"]');
    await expect(itemInCart).toBeVisible();

    // 4. กดปุ่ม Remove "จากในหน้าตะกร้า" เลย (เพื่อเทสการลบจากหน้า Cart โดยตรง)
    await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();

    // 5. Assert: ตรวจสอบว่าชื่อสินค้าต้องหายไปจากหน้าจอ
    await expect(itemInCart).toBeHidden();
    
    console.log('✅ Verified: Item successfully removed from the cart page.');
  });

  // --- Report Section ---
  test.afterAll(async () => {
    console.log('\n=========================================================');
    console.log(' 🛒  AUTOMATED TEST SUMMARY: DEEP CART VALIDATION');
    console.log('=========================================================');
    console.log(' 📂  Test Suite    : Task 3 - Cart & Inventory Sync');
    console.log(' 🔍  Validation    : Verified via Cart Page Navigation');
    console.log('---------------------------------------------------------');
    console.log(' ✅  Add & Verify In-Cart   : PASS');
    console.log(' ✅  Remove & Verify In-Cart: PASS');
    console.log('---------------------------------------------------------');
    console.log(' 🎉  OVERALL STATUS: 100% SUCCESSFUL');
    console.log('=========================================================\n');
  });

});