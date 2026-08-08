const { chromium } = require('playwright');
const path = require('path');
const os = require('os');

(async () => {
  const profilePath = path.join(os.homedir(), '.config', 'chromium');
  const browser = await chromium.launchPersistentContext(profilePath, {
    headless: false,
    channel: 'chromium',
    args: ['--disable-blink-features=AutomationControlled'],
  });

  const page = await browser.newPage();

  try {
    console.log('Navigating to LinkedIn...');
    await page.goto('https://www.linkedin.com', { waitUntil: 'networkidle', timeout: 30000 });

    const isLoggedIn = (await page.locator('button:has-text("Me")').count() > 0)
      || (await page.locator('.global-nav, nav[aria-label]').count() > 0);

    if (!isLoggedIn) {
      console.error('Not logged in. Please log in manually first.');
      await page.waitForTimeout(60000);
      await browser.close();
      process.exit(1);
    }

    console.log('Logged in. Going to Company Page creation...');
    await page.goto('https://www.linkedin.com/company/setup/new/', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Click "Company" page type
    await page.getByText('Company', { exact: true }).first().click();
    await page.waitForTimeout(2500);

    console.log('Filling company details...');

    // Name
    const nameSel = '#single-line-text-form-component-urn-li-fsu-pageCreationFormItem-NAME';
    await page.fill(nameSel, '1pointo');
    await page.waitForTimeout(500);

    // Public URL (universal name)
    const urlSel = '#single-line-text-form-component-urn-li-fsu-pageCreationFormItem-UNIVERSAL-NAME';
    await page.fill(urlSel, '1pointo');
    await page.waitForTimeout(500);

    // Website
    const webSel = '#single-line-text-form-component-urn-li-fsu-pageCreationFormItem-WEBSITE';
    await page.fill(webSel, 'https://1pointo.com');
    await page.waitForTimeout(500);

    // Industry (typeahead)
    const indSel = '#single-typeahead-entity-form-component-urn-li-fsu-pageCreationFormItem-INDUSTRY';
    await page.fill(indSel, 'IT Services');
    await page.waitForTimeout(1500);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);

    // Organization size
    const sizeSel = '#text-entity-list-form-component-urn-li-fsu-pageCreationFormItem-ORGANIZATION-SIZE';
    await page.selectOption(sizeSel, { label: '0–1 employees' });
    await page.waitForTimeout(500);

    // Organization type
    const typeSel = '#text-entity-list-form-component-urn-li-fsu-pageCreationFormItem-ORGANIZATION-TYPE';
    await page.selectOption(typeSel, { label: 'Self-employed' });
    await page.waitForTimeout(500);

    // Tagline
    const tagSel = '#multiline-text-form-component-urn-li-fsu-pageCreationFormItem-TAGLINE';
    await page.fill(tagSel, 'One point of operations. Compliance, security & platform operations for small businesses.');
    await page.waitForTimeout(500);

    // Logo upload
    const logoSel = '#media-upload-form-component-urn-li-fsu-pageCreationFormItem-LOGO';
    if (await page.locator(logoSel).count() > 0) {
      const logoPath = path.join(process.cwd(), 'public', 'og-image.svg');
      await page.setInputFiles(logoSel, logoPath);
      console.log('Logo uploaded.');
      await page.waitForTimeout(2000);
    }

    // Accept terms — click the label (checkbox input is covered by label)
    const termsSel = 'label[for="urn:li:fsu_pageCreationFormItem:TERMS_AND_CONDITIONS-0"]';
    if (await page.locator(termsSel).count() > 0) {
      await page.click(termsSel);
      await page.waitForTimeout(500);
    }

    console.log('Form filled. Looking for Create button...');
    await page.screenshot({ path: 'linkedin-form-filled.png', fullPage: true });

    // Click Create
    const createBtn = page.locator('button').filter({ hasText: /create|build my page|continue/i });
    if (await createBtn.count() > 0) {
      await createBtn.first().click();
      console.log('Create clicked. Waiting for page to build...');
      await page.waitForTimeout(5000);
      await page.screenshot({ path: 'linkedin-page-created.png', fullPage: true });
      console.log('Company page likely created. URL:', page.url());
    } else {
      console.error('Create button not found. Taking screenshot for debug.');
      await page.screenshot({ path: 'linkedin-no-create-btn.png', fullPage: true });
    }

  } catch (err) {
    console.error('Error:', err.message);
    await page.screenshot({ path: 'linkedin-error.png', fullPage: true });
  } finally {
    await browser.close();
  }
})();
