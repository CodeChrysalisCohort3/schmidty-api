
exports.up = function(knex, Promise) {
    return knex.schema.createTable('geocodes', (table) => {
        // column: id
        table.increments();

        // column: latitude from the geocode
        table.float('latitude')
          .notNullable();

        // column: longitude from the geocode
        table.float('longitude')
          .notNullable();

        // column: stored_at
        table.timestamp('stored_at')
          .defaultTo(knex.fn.now());
    });
};

exports.down = (knex, Promise) =>
  knex.schema.dropTable('geocodes');
