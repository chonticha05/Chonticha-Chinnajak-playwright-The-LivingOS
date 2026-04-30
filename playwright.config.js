// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 90000,
  testDir: './',

  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],

  expect: {
    timeout: 15000,
  },

  use: {
    headless: false,
    launchOptions: {
      slowMo: 500,
      args: ['--disable-blink-features=AutomationControlled'],
    },
    permissions:       ['geolocation', 'notifications'],
    userAgent:         'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    actionTimeout:     20000,
    navigationTimeout: 30000,
    trace:             'retain-on-failure',
    screenshot:        'only-on-failure',
    video:             'retain-on-failure',
  },

  projects: [

    // ── Desktop (เหมือนเดิม) ──────────────────────
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },

    // ── iPhone (Safari / WebKit) ──────────────────
    {
      name: 'iPhone 14',
      use: {
        ...devices['iPhone 14'],
        // 390×844 — touch + WebKit + portrait
        // userAgent override เพื่อให้เหมือน Safari จริง
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        hasTouch: true,
        isMobile: true,
      },
    },
    {
      name: 'iPhone 14 Pro Max',
      use: {
        ...devices['iPhone 14 Pro Max'],
        // 430×932
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        hasTouch: true,
        isMobile: true,
      },
    },

    // ── Android (Chrome) ──────────────────────────
    {
      name: 'Pixel 7',
      use: {
        ...devices['Pixel 7'],
        // 412×915 — touch + Chromium
        userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
        hasTouch: true,
        isMobile: true,
      },
    },
    {
      name: 'Galaxy S21',
      use: {
        ...devices['Galaxy S21'],
        userAgent: 'Mozilla/5.0 (Linux; Android 12; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
        hasTouch: true,
        isMobile: true,
      },
    },

    // ── Tablet ────────────────────────────────────
    {
      name: '📲 iPad Pro',
      use: {
        ...devices['iPad Pro 11'],
        hasTouch: true,
        isMobile: true,
      },
    },

    // ── iPhone รุ่นใหม่ล่าสุด ────────────────────
    {
      name: '📱 iPhone 16',
      use: {
        ...devices['iPhone 15'],
        viewport:  { width: 393, height: 852 },
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
        hasTouch:  true,
        isMobile:  true,
      },
    },
    {
      name: '📱 iPhone 16 Pro',
      use: {
        ...devices['iPhone 15 Pro'],
        viewport:  { width: 402, height: 874 },
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
        hasTouch:  true,
        isMobile:  true,
      },
    },
    {
      name: '📱 iPhone 16 Pro Max',
      use: {
        ...devices['iPhone 15 Pro Max'],
        viewport:  { width: 440, height: 956 },
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
        hasTouch:  true,
        isMobile:  true,
      },
    },

    // ── Samsung Galaxy รุ่นใหม่ล่าสุด ────────────
    {
      name: '📱 Samsung Galaxy S23',
      use: {
        ...devices['Galaxy S9+'],
        viewport:  { width: 393, height: 851 },
        userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-S911B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
        hasTouch:  true,
        isMobile:  true,
      },
    },
    {
      name: '📱 Samsung Galaxy S21',
      use: {
        ...devices['Galaxy S9+'],
        viewport:  { width: 360, height: 800 },
        userAgent: 'Mozilla/5.0 (Linux; Android 12; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
        hasTouch:  true,
        isMobile:  true,
      },
    },
    {
      name: '📱 Samsung Galaxy A54',
      use: {
        ...devices['Galaxy S9+'],
        viewport:  { width: 360, height: 780 },
        userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-A546B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
        hasTouch:  true,
        isMobile:  true,
      },
    },
    {
      name: '📱 Samsung Galaxy Z Fold6',
      use: {
        ...devices['Galaxy S9+'],
        viewport:  { width: 968, height: 848 },
        userAgent: 'Mozilla/5.0 (Linux; Android 14; SM-F956B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
        hasTouch:  true,
        isMobile:  false,
      },
    },
    {
      name: '📱 Samsung Galaxy Z Flip6',
      use: {
        ...devices['Galaxy S9+'],
        viewport:  { width: 360, height: 780 },
        userAgent: 'Mozilla/5.0 (Linux; Android 14; SM-F741B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
        hasTouch:  true,
        isMobile:  true,
      },
    },
    {
      name: '📱 Samsung Galaxy S25',
      use: {
        ...devices['Galaxy S9+'],
        viewport:  { width: 360, height: 780 },
        userAgent: 'Mozilla/5.0 (Linux; Android 15; SM-S931B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
        hasTouch:  true,
        isMobile:  true,
      },
    },
    {
      name: '📱 Samsung Galaxy Tab S8',
      use: {
        ...devices['Galaxy S9+'],
        viewport:  { width: 753, height: 1205 },
        userAgent: 'Mozilla/5.0 (Linux; Android 12; SM-X706B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
        hasTouch:  true,
        isMobile:  false,
      },
    },

  ],
});
