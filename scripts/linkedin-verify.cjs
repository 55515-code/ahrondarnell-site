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
  
  // Check if 1pointo company page exists
  await page.goto('https://www.linkedin.com/company/1pointo/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  const info = await page.evaluate(() => ({
    url: location.href,
    title: document.title,
    bodyText: document.body.innerText.slice(0, 400),
    hasFollowButton: !!document.querySelector('button:has-text("Follow")'),
  }));
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
