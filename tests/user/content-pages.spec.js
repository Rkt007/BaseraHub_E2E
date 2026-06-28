const { test } = require('../../fixtures/base-test');
const { assertContentRoute } = require('../../utils/content-routes');

test.describe('User Module - Static Content Pages', () => {
  test('@sanity @regression content pages load from the main public routes', async ({ homePage, page }) => {
    const routes = [
      { label: 'About', path: '/about-us' },
      { label: 'Services', path: '/services' },
      { label: 'Blogs', path: '/blogs' },
      { label: 'Contact Us', path: '/contact-us' },
      { label: 'Offers & Deals', path: '/offers-deals' }
    ];

    for (const route of routes) {
      await assertContentRoute(page, homePage, route);
    }
  });
});
