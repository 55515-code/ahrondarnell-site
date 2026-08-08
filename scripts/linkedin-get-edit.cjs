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
  
  // Go to edit page where the URL field is
  await page.goto('https://www.linkedin.com/company/143079410/admin/edit/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);
  
  const info = await page.evaluate(() => {
    const inputs = Array.from(document.querySelectorAll('input, textarea')).map(el => ({
      tag: el.tagName, name: el.name, id: el.id, value: el.value, placeholder: el.placeholder, ariaLabel: el.getAttribute('aria-label')||''
    })).filter(i => i.value || i.placeholder);
    return { url: location.href, inputs };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
