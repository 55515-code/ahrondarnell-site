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
  
  // Go to admin dashboard to find the public URL
  await page.goto('https://www.linkedin.com/company/143079410/admin/dashboard/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);
  
  const info = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href*="/company/"]')).map(a => ({ href: a.href, text: a.innerText.slice(0, 60) }));
    return { title: document.title, links: links.slice(0, 20), bodyText: document.body.innerText.slice(0, 500) };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
