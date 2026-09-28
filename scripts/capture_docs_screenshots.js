const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function capture() {
  const outputDir = path.join(__dirname, '../docs/screenshots');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });

  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 1. Executive Workspace Screenshot
  console.log('Capturing 01_cm_executive_workspace.png...');
  await page.screenshot({ path: path.join(outputDir, '01_cm_executive_workspace.png'), fullPage: false });

  // 2. Government Directory (GRM) Tab
  console.log('Navigating to GRM Directory...');
  const grmBtn = page.locator('button:has-text("Gov Directory"), button:has-text("அரசு அடைவு"), button:has-text("TN Hierarchy")').first();
  if (await grmBtn.isVisible()) {
    await grmBtn.click();
    await page.waitForTimeout(1500);
    console.log('Capturing 02_enterprise_grm_directory.png...');
    await page.screenshot({ path: path.join(outputDir, '02_enterprise_grm_directory.png'), fullPage: false });
  }

  // 3. Official Calendar Tab
  console.log('Navigating to Official Calendar...');
  const calBtn = page.locator('button:has-text("Official Calendar"), button:has-text("நாள்காட்டி")').first();
  if (await calBtn.isVisible()) {
    await calBtn.click();
    await page.waitForTimeout(1500);
    console.log('Capturing 03_official_calendar_appointments.png...');
    await page.screenshot({ path: path.join(outputDir, '03_official_calendar_appointments.png'), fullPage: false });
  }

  // 4. AI Copilot Drawer / Modal
  console.log('Opening AI Copilot...');
  const copilotBtn = page.locator('button:has-text("AI Copilot"), button:has-text("CM AI Copilot"), button[aria-label="Open Copilot"]').first();
  if (await copilotBtn.isVisible()) {
    await copilotBtn.click();
    await page.waitForTimeout(1500);
    console.log('Capturing 04_ai_copilot_decision_support.png...');
    await page.screenshot({ path: path.join(outputDir, '04_ai_copilot_decision_support.png'), fullPage: false });
  }

  await browser.close();
  console.log('All screenshots captured successfully in docs/screenshots!');
}

capture().catch(console.error);
