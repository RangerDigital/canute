const mqtt = require('../../mqtt');

const devices = require('../../models/devices');
const orgs = require('../../models/orgs');

class ShadowService {
  async get(orgId) {
    let deviceArray = await devices.find({ _orgId: orgId });

    let shadows = [];

    for (let device of deviceArray) {
      for (let shadow of device.shadows) {
        shadows.push(shadow);
      }
    }

    return shadows;
  }

  async getLocks(orgId, userId) {
    const deviceArray = await devices.find({ _orgId: orgId });
    const organisation = await orgs.findOne({ _id: orgId });

    let locks = [];

    for (let device of deviceArray) {
      for (let shadow of device.shadows) {
        shadow = shadow.toObject();

        if (organisation.roles.filter((x) => x.permissions.includes(shadow._id) && x.members.includes(userId)).length) {
          // Check if shadow class == lock.
          if (shadow.class === 'lock') {
            shadow.online = device.online;

            locks.push(shadow);
          }
        }
      }
    }

    return locks;
  }

  async engageLock(orgId, lockId, userId) {
    const device = await devices.findOne({ 'shadows._id': lockId });
    const organisation = await orgs.findOne({ _id: orgId });

    let lock = device.shadows.filter((x) => x._id == lockId && x.class == 'lock')[0];

    if (organisation.roles.filter((x) => x.permissions.includes(lock._id) && x.members.includes(userId)).length) {
      mqtt.publish(lock.topic, '{"desired": "engaged"}');

      return { success: true, lock: lock };
    }

    return { success: false };
  }
}

module.exports = new ShadowService();
