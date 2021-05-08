const devices = require('../models/devices');
const mqtt = require('../mqtt');

class HealthService {
  async checkStatus() {
    let errors = false;
    let response = { mqtt: 'error', mongo: 'error' };

    if (mqtt.connected() === true) {
      response['mqtt'] = 'ok';
    } else {
      errors = true;
    }

    try {
      await devices.findOne();
      response['mongo'] = 'ok';
    } catch {
      errors = true;
    }

    return { response, errors };
  }
}

module.exports = new HealthService();
