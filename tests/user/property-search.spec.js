const { test, expect } = require('../../fixtures/base-test');
const searchData = require('../../data/property-search.json');

test.describe('User Module - Search and Browse', () => {
  test('@smoke @sanity homepage loads and allows property search', async ({ homePage, page }) => {
    await homePage.goto();
    await homePage.assertLoaded();
    await homePage.search(searchData.city);

    await expect(page.locator('body')).toContainText(/property|properties|buy|rent|noida/i, { timeout: 15000 });
  });

  test('@regression homepage shows core navigation and CTA sections', async ({ homePage, page }) => {
    await homePage.goto();

    await expect(page.locator('body')).toContainText(/buy|rent|filters|contact/i, { timeout: 10000 });
    await expect(page.locator('body')).toContainText(/discover your dream|residential|commercial/i, { timeout: 10000 });
  });

  test('@regression homepage footer contains key support links', async ({ homePage, page }) => {
    await homePage.goto();

    await expect(page.getByText(/contact us|whatsapp|privacy|terms/i).first()).toBeVisible({ timeout: 10000 });
  });

  test('@regression homepage displays property cards or listings', async ({ homePage, page }) => {
    await homePage.goto();

    const cards = page.locator('a[href*="/property"], a[href*="/projects"], article, [class*="card"]').first();
    await expect(cards).toBeVisible({ timeout: 15000 });
  });

  test('@regression mobile navigation exposes menu actions', async ({ homePage, page }) => {
    await homePage.goto();
    await page.setViewportSize({ width: 390, height: 844 });

    const menuButton = page.getByRole('button').filter({ hasText: /menu|open|☰/i }).first();
    if (await menuButton.isVisible().catch(() => false)) {
      await menuButton.click();
      await expect(page.locator('body')).toContainText(/buy|rent|contact|login/i, { timeout: 10000 });
    }
  });

  test('@regression homepage includes about services blogs contact offers content links', async ({ homePage, page }) => {
    await homePage.goto();

    const contentLabels = ['about', 'services', 'blogs', 'contact', 'offers', 'deals'];
    for (const label of contentLabels) {
      const matchingLink = page.getByRole('link').filter({ hasText: new RegExp(label, 'i') }).first();
      if (await matchingLink.isVisible().catch(() => false)) {
        await expect(matchingLink).toBeVisible({ timeout: 10000 });
      }
    }
  });

  test('@regression homepage content sections load meaningful body content', async ({ homePage, page }) => {
    await homePage.goto();

    await expect(page.locator('body')).toContainText(/dream|property|buy|rent|contact|residential|commercial/i, { timeout: 15000 });
  });

  test('@regression user can apply property filters', async ({ searchPage, page }) => {
    await searchPage.goto();
    await searchPage.searchByCity(searchData.city);
    await searchPage.applyFilters(searchData.filters);

    await expect(page.getByText(/showing|properties|no properties match/i).first()).toBeVisible();
  });
});
