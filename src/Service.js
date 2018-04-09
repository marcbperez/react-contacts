import fetch from 'cross-fetch';

/**
 * Application service
 */
class Service {
  /**
   * Initialize the service.
   * @param {string} baseUrl - The base url of the service.
   */
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getContacts(callback, search) {
    /* Prepare fetch parameters. */
    var init = {
      method: 'GET',
      cache: 'default',
    };

    /* Fetch data and send to callback. */
    fetch(this.baseUrl, init)
      .then(function(response) {
        return response.json();
      }).then(function(data) {
        /* Search by a term and filter data entries. */
        if (search) {
          data = data.filter(
            (data) => JSON.stringify(data).toLowerCase()
              .indexOf(search.toLowerCase()) !== -1);
        }
        callback(data);
      });
  }
}

export default Service;
