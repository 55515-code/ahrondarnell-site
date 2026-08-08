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
  await page.goto('https://www.linkedin.com', { waitUntil: 'networkidle', timeout: 30000 });
  
  // Dump key elements
  const info = await page.evaluate(() => {
    const out = {};
    out.url = location.href;
    out.title = document.title;
    out.hasProfilePhoto = !!document.querySelector('img[class*="profile"]');
    out.hasMeMenu = !!document.querySelector('[class*="global-nav__me"], [class*="me-menu"], button[class*="profile"]');
    out.hasMeButton = !!document.querySelector('button[aria-label*="me" i]');
    out.hasNav = !!document.querySelector('.global-nav, nav[aria-label], [role="navigation"]');
    out.allImages = document.querySelectorAll('img').length;
    out.bodyTextSample = document.body.innerText.slice(0, 500);
    out.meButtons = Array.from(document.querySelectorAll('button, a')).filter(el => /me|profile|account/i.test(el.getAttribute('aria-label')||el.textContent||'')).slice(0,10).map(el => ({ tag: el.tagName, label: el.getAttribute('aria-label')||'', text: (el.textContent||'').slice(0,40) }));
    return out;
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
