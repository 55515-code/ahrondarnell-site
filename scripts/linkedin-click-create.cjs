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

  // Find the Create button specifically (not nav items)
  const createBtn = page.locator('button:has-text("Create")').first();
  console.log('Create button count:', await page.locator('button:has-text("Create")').count());
  await createBtn.click();
  await page.waitForTimeout(3000);

  const info = await page.evaluate(() => {
    const editors = document.querySelectorAll('[contenteditable], textarea, [role="textbox"]');
    const buttons = Array.from(document.querySelectorAll('button')).map(b => b.innerText.slice(0, 30)).filter(t => t).slice(0, 20);
    return {
      url: location.href,
      title: document.title,
      bodySample: document.body.innerText.slice(0, 500),
      editableCount: editors.length,
      editableTags: Array.from(editors).slice(0, 8).map(e => ({ tag: e.tagName, ce: e.getAttribute('contenteditable'), role: e.getAttribute('role'), id: e.id, class: (e.className||'').slice(0,80) })),
      buttons,
    };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
