const moment = require('moment');

class Geocode {
  /**
   * @param object dbRawData
   */
  constructor(dbRawData) {
    this.id = dbRawData.id;
    this.latitude = dbRawData.latitude;
    this.longitude = dbRawData.longitude;
    this.storedAt = new Date(dbRawData.stored_at);
  }

  /**
   * @return object
   */
  serialize() {
    return {
      id: this.id,
      latitude: this.latitude,
      longitude: this.longitude,
      storedAt: moment(this.storedAt).format('hh:mm:ss'),
    };
  }
}

module.exports = Geocode;
