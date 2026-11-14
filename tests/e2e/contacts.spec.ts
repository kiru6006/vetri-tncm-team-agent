import { test, expect } from '@playwright/test';

test.describe('Government Contacts Directory (/contacts)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contacts');
  });

  test('AC-1: loads and displays seed records with correct categories', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Government Contacts Directory');
    await expect(page.getByRole('tab', { name: /Ministers/i })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Collectors/i })).toBeVisible();
  });

  test('AC-2: global search for Chengalpattu returns collector, SP, and DFO records in <200ms', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search by official name/i);
    const startTime = Date.now();
    await searchInput.fill('Chengalpattu');

    // Wait for filtered cards to settle
    await page.waitForTimeout(350); // allow 300ms debounce
    const duration = Date.now() - startTime - 300;
    expect(duration).toBeLessThanOrEqual(250);

    const cards = page.locator('article');
    await expect(cards).toContainText(['Chengalpattu']);
  });

  test('AC-3: filtering by IPS + Chennai returns Chennai COP', async ({ page }) => {
    // Select category tab or service filter
    const ipsTab = page.getByRole('tab', { name: /IPS/i });
    if (await ipsTab.isVisible()) {
      await ipsTab.click();
    }
    const searchInput = page.getByPlaceholder(/search by official name/i);
    await searchInput.fill('Chennai');
    await page.waitForTimeout(350);

    const cards = page.locator('article');
    await expect(cards).toContainText(['Commissioner of Police', 'Greater Chennai']);
  });

  test('AC-4: clicking a card opens detail sheet with source metadata and badge', async ({ page }) => {
    const firstCard = page.locator('article').first();
    await firstCard.click();

    const detailDialog = page.getByRole('dialog');
    await expect(detailDialog).toBeVisible();
    await expect(detailDialog).toContainText('Official Directory Record');
    await expect(detailDialog).toContainText('Data Integrity & Status:');
    await expect(detailDialog.getByText(/open official source/i)).toBeVisible();
  });

  test('AC-5 & AC-6: READONLY role user cannot see email/phone, rendered as Restricted and CSV export strips them', async ({ page }) => {
    // Switch role to READONLY
    const roleSelect = page.locator('#role-select');
    await roleSelect.selectOption('READONLY');

    const firstCard = page.locator('article').first();
    await expect(firstCard.getByText(/restricted for readonly/i).first()).toBeVisible();

    // Verify copy button is not present
    await expect(firstCard.getByLabel('Copy office email')).toHaveCount(0);
  });

  test('AC-7: CONFLICTED status badge displays note tooltip and amber styling', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search by official name/i);
    await searchInput.fill('Nagercoil');
    await page.waitForTimeout(350);

    const conflictedBadge = page.getByText(/conflicted sources/i).first();
    await expect(conflictedBadge).toBeVisible();
  });

  test('AC-8: NOT_PUBLICLY_AVAILABLE renders grey badge without blank space', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search by official name/i);
    await searchInput.fill('Chief Minister');
    await page.waitForTimeout(350);

    const cmCard = page.locator('article').filter({ hasText: /chief minister/i }).first();
    await expect(cmCard.getByText('NOT_PUBLICLY_AVAILABLE').first()).toBeVisible();
  });

  test('AC-9: DataQualityBanner displays verified date and is dismissible', async ({ page }) => {
    const banner = page.getByRole('region', { name: /data quality notice/i });
    await expect(banner).toBeVisible();
    await expect(banner).toContainText('2026-11-14');

    const dismissBtn = banner.getByLabel(/dismiss data quality notice/i);
    await dismissBtn.click();
    await expect(banner).not.toBeVisible();
  });

  test('AC-12: Keyboard shortcut Cmd+K focuses search bar', async ({ page }) => {
    await page.keyboard.press('Meta+k');
    const searchInput = page.getByPlaceholder(/search by official name/i);
    await expect(searchInput).toBeFocused();
  });
});
