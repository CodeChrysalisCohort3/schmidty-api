// load the configs
const config = require('./config.js');

// services with all modules
const services = require('./services')(config);

const apiRouter = require('./routes/api')(services);

const morgan = require('morgan'); // a popular library for logging your requests

const bodyParser = require('body-parser'); // a middleware plugin to enable express to parse JSON

// and of course, an express server =)
const express = require('express');

const app = express();

// 1. log every request when it comes in
app.use(morgan('dev'));

// 3. Parse request bodies as json
app.use(bodyParser.json({ type: 'application/json', limit: '50mb' }));

// 4. If the requests begin with '/api', hand them off to the API router
app.use('/api', apiRouter);
app.use(express.static(`${__dirname}/public`)); // otherwise load the client app

// 5. Catch unhandled errors thrown by any of the previous middleware steps
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.stack) {
    if (err.stack.match('node_modules/body-parser')) return res.status(400).send('Invalid JSON');
  }

  services.logger.log(err);
  const errorStack = Array.from(err).join(' | ');
  console.log(err);
  return res.status(500).send(`Internal Error.${errorStack}`);
});

/**
********************************START SERVER********************************
****************************************************************************
*/

app.listen(config.express.port, () => {
  services.logger.log(`Server up and listening on port ${config.express.port}`);
});
