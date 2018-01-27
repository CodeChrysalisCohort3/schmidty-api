const router = require('express').Router();
const geocodesRouter = require('./geocodes');

module.exports = (services) => {
  router.use('/geocodes', geocodesRouter(services));

  return router;
};
