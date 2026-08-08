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
  await page.goto('https://www.linkedin.com/company/create/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  
  const info = await page.evaluate(() => {
    const out = {};
    out.url = location.href;
    out.title = document.title;
    out.inputs = Array.from(document.querySelectorAll('input, textarea, select')).map(el => ({
      tag: el.tagName, name: el.getAttribute('name')||'', id: el.id||'', type: el.type||'', placeholder: el.getAttribute('placeholder')||'', ariaLabel: el.getAttribute('aria-label')||''
    })).slice(0, 30);
    out.bodyTextSample = document.body.innerText.slice(0, 800);
    return out;
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
