const moment = require('moment');

module.exports = config =>
  ({
    log: () => {
      const time = [moment().format(config.format) + ':: '];
      console.log.apply(null, time.concat(Array.prototype.slice.call(arguments)));
    },
  });
