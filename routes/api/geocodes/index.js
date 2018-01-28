const router = require('express').Router();

module.exports = (services) => {
  /**
   * store a new geocode
   */
  router.post('', (request, respone) => {
    return services.db.geocodes.create({ address: request.body.address })
      .then(geocode => {
        console.log(11111111, geocode);
        return respone.status(201).json(geocode.serialize())
      })
      .catch(error => respone.status(400).send(error.message));
  });

  /**
   * load all geocodes
   */
  router.get('', (request, respone) => services.db.geocodes.list()
    .then(geocodes => geocodes.map(geocode => geocode.serialize()))
    .then(serializedGeocodes => respone.status(200).json(serializedGeocodes))
    .catch(error => respone.status(400).send(error.message)));

  /**
   * load a geocode by address
   */
  router.get('/:address', (request, respone) => services.db.geocodes.get({ address: request.query.address })
    .then(geocodes => geocodes.map(geocode => geocode.serialize()))
    .then(serializedGeocodes => respone.status(200).json(serializedGeocodes))
    .catch(error => respone.status(400).send(error.message)));

  /**
   * delete a single geocode
   */
  router.delete('', (request, respone) =>
    services.db.geocodes.delete()
      .then(statusResponse => respone.status(201).json(statusResponse))
      .catch(error => respone.status(400).send(error.message)));

  return router;
};
