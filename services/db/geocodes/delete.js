module.exports = knex =>
  /**
   * @param object params
   */
  (params) => {
    const querySingleRow = knex('geocodes')
      .where({ latitude: params.latitude, longitude: params.longitude });

    return querySingleRow
      .select()
      .then((dbRawData) => {
        if (dbRawData.length === 1) {
          return querySingleRow
            .del()
            .then(() => ({ status: 'successfull' }));
        }
        return { status: 'geocode not exists' };
      });
  };
