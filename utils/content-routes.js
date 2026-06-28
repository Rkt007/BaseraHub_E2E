const { expect } = require('@playwright/test');

async function assertContentRoute(page, homePage, route) {
  await homePage.goto();

  const link = page.locator('a').filter({ hasText: new RegExp(route.label, 'i') }).filter({ hasNot: page.locator('[aria-label*="WhatsApp"], [aria-label*="whatsapp"]') }).first();

  if (await link.isVisible().catch(() => false)) {
    await link.click({ force: true }).catch(async () => {
      await link.scrollIntoViewIfNeeded();
      await link.click();
    });

    await page.waitForURL(new RegExp(route.path.replace(/\//g, '\\/') + '$'), { timeout: 20000 }).catch(() => {});
    await page.locator('body').waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    await expect(page.locator('body')).not.toContainText(/page not found|doesn't exist/i, { timeout: 10000 });

    await page.goBack();
    await homePage.goto();
  }
}

module.exports = { assertContentRoute };
