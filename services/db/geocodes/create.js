const Geocoder = require('./modules/Geocoder');
const Get = require('./get');

module.exports = (knex, EntityGeocode) => (params) => {
  // address exists?
  if (!params || params.address === '') {
    throw new Error('please add a address');
  }

  Geocoder.geocode(params.address)
    .then((response) => {
      response.json().then((json) => {
        // error-handling
        if (json.results.length === 0) {
          throw Error(`no geocode found for the address ${params.address}`);
        }
        if (json.results.length > 1) {
          throw Error(`address is not unique enough. found more geocodes for ${params.address}`);
        }
        if (json.status !== 'ok') {
          throw Error(json.status);
        }
        const singleGeocode = json.results[0];

        knex('geocodes').insert({
          latitude: singleGeocode.geometry.location.lat,
          longitude: singleGeocode.geometry.location.lon,

          types: singleGeocode.types.join(','),
          address: params.address,
        }).then(() => {
          const getRequest = Get(knex, EntityGeocode);
          return getRequest({
            latitude: params.latitude,
            longitude: params.longitude,
          });
        });
      });
    });
};

