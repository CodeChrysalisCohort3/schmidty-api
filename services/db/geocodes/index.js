const Geocode = require('./modules/EntityGeocode');

module.exports = knex => ({
  create: require('./create')(knex, Geocode),
  update: require('./update')(knex, Geocode),
  delete: require('./delete')(knex),
  list: require('./list')(knex, Geocode),
  get: require('./get')(knex, Geocode),
});
