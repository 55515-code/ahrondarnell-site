const { chromium } = require('playwright');
const path = require('path');
const os = require('os');

(async () => {
  const profilePath = path.join(os.homedir(), '.config', 'chromium');
  const browser = await chromium.launchPersistentContext(profilePath, {
    headless: false, channel: 'chromium',
    args: ['--disable-blink-features=AutomationControlled'],
  });
  const page = await browser.newPage();

  await page.goto('https://www.linkedin.com/company/143079410/admin/dashboard/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);
  await page.locator('button:has-text("Create")').first().click();
  await page.waitForTimeout(2000);
  await page.locator('text="Start a post"').first().click();
  await page.waitForTimeout(3000);

  // Type a short test message
  const editor = page.locator('div[contenteditable="true"][role="textbox"]').first();
  await editor.click();
  await page.keyboard.type('Test post from automation');
  await page.waitForTimeout(1000);

  // Inspect ALL Post-like buttons
  const buttons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('div[role="dialog"] button')).map(b => ({
      text: b.innerText,
      enabled: !b.disabled,
      classes: b.className.slice(0, 80),
    }));
  });
  console.log(JSON.stringify(buttons, null, 2));
  await browser.close();
})();
