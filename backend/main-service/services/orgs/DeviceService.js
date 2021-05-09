const crypto = require('crypto');
const devices = require('../../models/devices');

class DeviceService {
  async get(orgId) {
    return await devices.find({ _orgId: orgId });
  }

  async getOne(orgId, deviceId) {
    return await devices.findOne({ _orgId: orgId, _id: deviceId });
  }

  async deleteOne(orgId, deviceId) {
    return await devices.deleteOne({ _orgId: orgId, _id: deviceId });
  }

  async create(orgId, name) {
    let device = new devices({ name: name, _orgId: orgId });

    password = crypto.randomBytes(16).toString('hex');
    salt = crypto.randomBytes(16).toString('hex');

    device.auth.salt = salt;
    device.auth.username = crypto.randomBytes(16).toString('hex');
    device.auth.password = crypto.createHmac('sha512', salt).update(password).digest('hex');

    device.save();

    return device;
  }

  async updateName(orgId, deviceId, name) {
    let device = await devices.findOne({ _orgId: orgId, _id: deviceId });

    device.name = name;
    device.save();

    return device;
  }
}

module.exports = new DeviceService();
