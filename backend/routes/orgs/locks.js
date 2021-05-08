const mqtt = require('../../mqtt');
const devices = require('../../models/devices');

async function routes(router) {
  router.register(require('../../hooks/orgHook'));

  router.get('/', async (req, res) => {
    const { orgId } = req.params;

    let deviceArray = await devices.find({ _orgId: orgId });

    let locks = [];

    for (let device of deviceArray) {
      for (let shadow of device.shadows) {
        // Check if users have a role with permission to this shadow.

        shadow = shadow.toObject();

        if (req.org.roles.filter((x) => x.permissions.includes(shadow._id) && x.users.includes(req.user._id)).length) {
          // Check if shadow class == lock.
          if (shadow.class === 'lock') {
            shadow.online = device.online;

            locks.push(shadow);
          }
        }
      }
    }

    res.send(locks);
  });

  router.post('/:lockId', async (req, res) => {
    const { lockId } = req.params;

    let device = await devices.findOne({ 'shadows._id': lockId });

    let lock = device.shadows.filter((x) => x._id == lockId && x.class == 'lock')[0];

    if (req.org.roles.filter((x) => x.permissions.includes(lock._id) && x.users.includes(req.user._id)).length) {
      mqtt.publish(lock.topic, '{"desired": "engaged"}');

      return res.send(lock);
    }

    return res.code(403).send({ msg: 'Permissions not sufficient for this operation!' });
  });
}

module.exports = routes;
