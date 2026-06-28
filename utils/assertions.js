const { expect } = require('@playwright/test');

async function expectToast(page, message) {
  await expect(page.getByText(message, { exact: false })).toBeVisible();
}

async function expectTableHasValue(page, value) {
  await expect(page.getByRole('table').getByText(value, { exact: false })).toBeVisible();
}

module.exports = { expectToast, expectTableHasValue };
