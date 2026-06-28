const timestamp = () => Date.now();

const buildUser = (role = 'buyer') => ({
  firstName: 'QA',
  lastName: `${role}-${timestamp()}`,
  email: `qa.${role}.${timestamp()}@example.com`,
  mobile: `98765${String(timestamp()).slice(-5)}`,
  password: 'ChangeMe123!',
  role
});

const buildIntent = () => ({
  budget: '7500000',
  preferredLocation: 'Pune',
  purchaseTimeline: '1-3 months',
  loanRequired: 'Yes'
});

const buildProperty = () => ({
  title: `Automation Villa ${timestamp()}`,
  price: '12500000',
  description: 'Spacious automation test property with premium amenities.',
  address: 'Sector 21',
  city: 'Pune',
  state: 'Maharashtra',
  landmark: 'Near Metro Station',
  street: 'Main Road',
  listingType: 'Sell',
  size: '1800',
  bedrooms: '3',
  bathrooms: '3',
  furnishing: 'Semi Furnished',
  parking: 'Covered',
  ownership: 'Freehold',
  builderName: 'QA Builders',
  yearCompleted: '2024',
  totalFloors: '12'
});

module.exports = { buildUser, buildIntent, buildProperty };
