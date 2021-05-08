const crypto = require('crypto');
const devices = require('../models/devices');
const config = require('../configs/config');

class AuthService {
  async checkCredentials(username, password) {
    console.log(username);
    console.log(config.mqtt.username);

    if (username == config.mqtt.username && password == config.mqtt.password) {
      return true;
    }

    let device = await devices.findOne({ 'auth.username': username });

    if (device && device.auth.password == crypto.createHmac('sha512', device.auth.salt).update(password).digest('hex')) {
      return true;
    }

    return false;
  }

  async checkSuperUser(username, password) {
    if (username == config.mqtt.username && password == config.mqtt.password) {
      return true;
    }

    return false;
  }

  async checkAccess(client, topic) {
    const parsedTopic = topic.split('/');

    const device = await devices.findOne({ _id: client });

    if (device && client == parsedTopic[1]) {
      return true;
    }

    return false;
  }
}

module.exports = new AuthService();
