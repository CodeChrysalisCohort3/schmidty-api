const moment = require('moment');

class Geocode {
  /**
   * @param object dbRawData
   */
  constructor(dbRawData) {
    this.id = dbRawData.id;
    this.latitude = dbRawData.latitude;
    this.longitude = dbRawData.longitude;
    this.address = dbRawData.address;
    this.storedAt = new Date(dbRawData.stored_at);
  }

  /**
   * @return object
   */
  serialize() {
    return {
      id: this.id,
      address: this.address,
      latitude: this.latitude,
      longitude: this.longitude,
      storedAt: moment(this.storedAt).format('hh:mm:ss'),
    };
  }
}

module.exports = Geocode;
