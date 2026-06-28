module.exports = {
  search: {
    city: 'input[type="search"]',
    submit: 'button:has-text("Search")',
    budget: 'text=Price Range',
    bedrooms: 'text=BHK Type',
    bathrooms: 'text=Bathrooms',
    propertyType: 'text=Property Type',
    furnishing: 'text=Furnishing',
    amenities: 'text=Amenities',
    //allow :'.ant-btn css-198drv2',
    //allow: 'button:has-text("Allow")',
    allow: 'button >> text=Allow',
    resultCard: 'a[href*="/property"], a[href*="/projects"], article, [class*="card"]'
  },
  details: {
    name: '[data-testid="property-name"], h1',
    price: '[data-testid="property-price"]',
    description: '[data-testid="property-description"]',
    images: '[data-testid="property-images"] img',
    videos: '[data-testid="property-videos"], video',
    tour360: '[data-testid="tour-360"]',
    virtualTour: '[data-testid="virtual-tour"]',
    map: '[data-testid="map-location"]',
    amenities: '[data-testid="amenities"]',
    relatedProperties: '[data-testid="related-properties"]',
    intentForm: '[data-testid="intent-form"]'
  }
};
