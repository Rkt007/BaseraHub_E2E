const { test } = require('../../fixtures/base-test');
const { buildIntent } = require('../../utils/data-builder');
const searchData = require('../../data/property-search.json');

test.describe('User Module - Property Details and Intent', () => {
  test('@regression property details display rich content and submit intent form', async ({
    searchPage,
    propertyDetailsPage
  }) => {
    await searchPage.goto();
    await searchPage.searchByCity(searchData.city);
    
    const noProperties = await searchPage.page.getByText(/no properties match/i).count();
    test.skip(noProperties, 'No public property result is currently available for the configured city.');

    await searchPage.openFirstProperty();

    await propertyDetailsPage.assertCoreSectionsVisible();
    await propertyDetailsPage.submitIntent(buildIntent());
  });
});
