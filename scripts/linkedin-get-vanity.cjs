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
  
  // Go to edit page to see the vanity URL
  await page.goto('https://www.linkedin.com/company/143079410/admin/settings/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);
  
  const info = await page.evaluate(() => {
    // Find the public URL field
    const inputs = Array.from(document.querySelectorAll('input')).map(el => ({
      name: el.name, id: el.id, value: el.value, placeholder: el.placeholder, ariaLabel: el.getAttribute('aria-label')||''
    }));
    const bodyText = document.body.innerText;
    const vanityMatch = bodyText.match(/linkedin\.com\/company\/([a-zA-Z0-9-]+)/g);
    return { inputs: inputs.filter(i => i.value || i.name), vanityUrls: vanityMatch, bodySnippet: bodyText.slice(0, 800) };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
