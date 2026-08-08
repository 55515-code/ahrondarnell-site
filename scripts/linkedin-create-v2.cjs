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
    await page.goto('https://www.linkedin.com', { waitUntil: 'networkidle', timeout: 30000 });
    const isLoggedIn = (await page.locator('button:has-text("Me")').count() > 0);
    if (!isLoggedIn) {
      console.error('Not logged in');
      await page.waitForTimeout(60000);
      await browser.close();
      process.exit(1);
    }

    await page.goto('https://www.linkedin.com/company/setup/new/', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    await page.getByText('Company', { exact: true }).first().click();
    await page.waitForTimeout(2500);

    // Name
    await page.fill('#single-line-text-form-component-urn-li-fsu-pageCreationFormItem-NAME', '1pointo');
    await page.waitForTimeout(500);

    // Try a unique public URL since '1pointo' was taken
    const uniqueUrl = '1pointo-ops';
    await page.fill('#single-line-text-form-component-urn-li-fsu-pageCreationFormItem-UNIVERSAL-NAME', uniqueUrl);
    await page.waitForTimeout(1000);
    await page.keyboard.press('Tab');
    await page.waitForTimeout(1000);

    await page.fill('#single-line-text-form-component-urn-li-fsu-pageCreationFormItem-WEBSITE', 'https://1pointo.com');
    await page.waitForTimeout(500);

    // Industry
    await page.fill('#single-typeahead-entity-form-component-urn-li-fsu-pageCreationFormItem-INDUSTRY', 'IT Services');
    await page.waitForTimeout(1500);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);

    // Try to select the actual dropdown if shown
    const industryDropdown = page.locator('[role="listbox"] [role="option"]').first();
    if (await industryDropdown.count() > 0) {
      await industryDropdown.click();
      await page.waitForTimeout(500);
    }

    await page.selectOption('#text-entity-list-form-component-urn-li-fsu-pageCreationFormItem-ORGANIZATION-SIZE', { label: '0–1 employees' });
    await page.waitForTimeout(500);

    await page.selectOption('#text-entity-list-form-component-urn-li-fsu-pageCreationFormItem-ORGANIZATION-TYPE', { label: 'Self-employed' });
    await page.waitForTimeout(500);

    await page.fill('#multiline-text-form-component-urn-li-fsu-pageCreationFormItem-TAGLINE', 'One point of operations. Compliance, security & platform operations for small businesses.');
    await page.waitForTimeout(500);

    // Skip logo upload since it failed
    console.log('Skipping logo (SVG not supported, will upload later)');

    // Accept terms via label
    await page.click('label[for="urn:li:fsu_pageCreationFormItem:TERMS_AND_CONDITIONS-0"]');
    await page.waitForTimeout(500);

    await page.screenshot({ path: 'linkedin-v2-filled.png', fullPage: true });

    // Click Create page
    const createBtn = page.locator('button:has-text("Create page")');
    if (await createBtn.count() > 0) {
      await createBtn.first().click();
      console.log('Create page clicked');
      await page.waitForTimeout(6000);
      console.log('Post-click URL:', page.url());
      await page.screenshot({ path: 'linkedin-v2-after-create.png', fullPage: true });
    }
  } catch (err) {
    console.error('Error:', err.message);
    await page.screenshot({ path: 'linkedin-v2-error.png', fullPage: true });
  } finally {
    await browser.close();
  }
})();
