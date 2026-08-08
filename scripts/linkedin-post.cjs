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

  try {
    await page.goto('https://www.linkedin.com/company/143079410/admin/dashboard/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);

    await page.locator('button:has-text("Create")').first().click();
    await page.waitForTimeout(2000);
    await page.locator('text="Start a post"').first().click();
    await page.waitForTimeout(3000);

    const announcement = `I just launched 1pointo.com.

After 20+ years in IT, security, and compliance, I built the site I wish existed when I started: clear guidance on SOC 2, PCI DSS, and HIPAA for small businesses — no jargon, no enterprise pricing, no fluff.

• Plain-English breakdowns of each framework
• A /security page showing my own posture (trust should be verifiable)
• Interactive assessments coming soon
• Digital art from my alter ego Electrac Angel

Built with Astro, on Cloudflare Pages, optimized for AI crawlers.

Check it out: https://1pointo.com

#Compliance #SOC2 #PCIDSS #HIPAA #CyberSecurity #SmallBusiness`;

    const editor = page.locator('div[contenteditable="true"][role="textbox"]').first();
    await editor.waitFor({ timeout: 10000 });
    await editor.click();

    // Use clipboard paste
    await page.evaluate((text) => navigator.clipboard.writeText(text), announcement);
    await page.waitForTimeout(500);
    await page.keyboard.press('Control+v');
    await page.waitForTimeout(2000);

    const typed = await editor.innerText();
    console.log('Typed length:', typed.length, '/ expected:', announcement.length);

    // Click the PRIMARY Post button (not the schedule circle button)
    const postBtn = page.locator('button.share-actions__primary-action');
    await postBtn.click();
    console.log('Primary Post clicked');
    await page.waitForTimeout(8000);

    await page.screenshot({ path: 'linkedin-after-primary-post.png', fullPage: true });
    console.log('URL after publish:', page.url());

    // Verify by visiting the page posts list
    await page.goto('https://www.linkedin.com/company/143079410/admin/page-posts/published/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'linkedin-posts-list.png', fullPage: true });
    const postCount = await page.locator('.feed-shared-update-v2, [data-testid="post-item"]').count();
    console.log('Posts visible on page:', postCount);
  } catch (err) {
    console.error('Error:', err.message);
    await page.screenshot({ path: 'linkedin-post-error.png', fullPage: true });
  } finally {
    await browser.close();
  }
})();
