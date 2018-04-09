import Service from './Service';

const fetch = jest.fn(() => new Promise(resolve => resolve()));

it('gets all contacts', () => {
  const service = new Service('');
  service.getContacts(function(data) {}, '');
});
