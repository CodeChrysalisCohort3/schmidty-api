const fetch = require('node-fetch');

 /*
{ results:
   [ {  address_components:
   [ { long_name: 'Solingen', short_name: 'SG', types: [Array] },
     { long_name: 'Düsseldorf',
       short_name: 'Düsseldorf',
       types: [Array] },
     { long_name: 'North Rhine-Westphalia',
       short_name: 'NRW',
       types: [Array] },
     { long_name: 'Germany', short_name: 'DE', types: [Array] } ],
       formatted_address: 'Solingen, Germany',
       geometry:
   { bounds: { northeast: [Object], southwest: [Object] },
     location: { lat: 51.1652199, lng: 7.0671161 },
     location_type: 'APPROXIMATE',
     viewport: { northeast: [Object], southwest: [Object] } },
       place_id: 'ChIJMW7E4oTUuEcRMHQqSvxgJwQ',
       types: [ 'locality', 'political' ] } ],
  status: 'OK' }


  [ { long_name: 'Solingen',
    short_name: 'SG',
    types: [ 'locality', 'political' ] },
  { long_name: 'Düsseldorf',
    short_name: 'Düsseldorf',
    types: [ 'administrative_area_level_2', 'political' ] },
  { long_name: 'North Rhine-Westphalia',
    short_name: 'NRW',
    types: [ 'administrative_area_level_1', 'political' ] },
  { long_name: 'Germany',
    short_name: 'DE',
    types: [ 'country', 'political' ] } ]
  */

class Geocoder {
  static geocode(address) {
    if (address === '') {
      throw new Error('address is missing');
    }

    return fetch(Geocoder.getUrl(address));
  }

  static getUrl(address) {
    return `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`;
  }
}

module.exports = Geocoder;