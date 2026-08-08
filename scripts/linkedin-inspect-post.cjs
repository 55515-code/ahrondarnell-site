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

  // Try going directly to the post creation page
  await page.goto('https://www.linkedin.com/company/143079410/admin/post/new/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);
  
  const info = await page.evaluate(() => {
    const editors = document.querySelectorAll('[contenteditable], textarea, [role="textbox"]');
    return {
      url: location.href,
      title: document.title,
      bodySample: document.body.innerText.slice(0, 400),
      editableCount: editors.length,
      editableTags: Array.from(editors).slice(0, 5).map(e => ({ tag: e.tagName, ce: e.getAttribute('contenteditable'), role: e.getAttribute('role'), id: e.id, aria: e.getAttribute('aria-label')||'' })),
    };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
