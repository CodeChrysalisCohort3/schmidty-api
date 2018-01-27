module.exports = (knex, EntityGeocode) => () =>
  knex('geocodes')
    .select()
    .then(geocodes => geocodes.map(geocode => new EntityGeocode(geocode)));
