
exports.up = knex =>
  knex.schema.table('geocodes', table =>
    table.string('address', 200)
      .notNullable()
      .defaultTo(''));


exports.down = knex =>
  knex.schema.table('geocodes', table => table.dropColumn('geocodes'));
