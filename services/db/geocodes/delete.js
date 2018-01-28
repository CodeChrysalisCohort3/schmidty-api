module.exports = knex =>
  /**
   * @param object params
   */
  () => {
    return knex('geocodes')
      .del()
      .then(() => ({ status: 'successfull' }));
  };
