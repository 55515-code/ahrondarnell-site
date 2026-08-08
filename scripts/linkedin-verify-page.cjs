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

  // The company ID is 143079410
  const companyId = '143079410';
  await page.goto(`https://www.linkedin.com/company/${companyId}/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);
  
  const info = await page.evaluate(() => ({
    url: location.href,
    title: document.title,
    name: document.querySelector('h1')?.innerText || '',
    hasFollowButton: !!Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Follow')),
    snippet: document.body.innerText.slice(0, 400),
  }));
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
