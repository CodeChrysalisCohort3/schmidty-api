const Knex = require('knex');

module.exports = (config) => {
  // initialize a connection to the database, and pass this
  // to the various submodules within
  const knex = Knex({
    client: config.client,
    port: config.connection.port,
    connection: {
      host: config.connection.host,
      database: config.connection.database,
    },
  });

  return {
    geocodes: require('./geocodes')(knex),
  };
};
