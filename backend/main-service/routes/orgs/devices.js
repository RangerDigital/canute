const crypto = require('crypto');
const devices = require('../../models/devices');

async function routes(router) {
  router.get('/', async (req, res) => {
    const { orgId } = req.params;

    let device = await devices.find({ _orgId: orgId });

    res.send(device);
  });

  router.get('/:deviceId', async (req, res) => {
    const { orgId, deviceId } = req.params;

    let device = await devices.findOne({ _orgId: orgId, _id: deviceId });

    res.send(device);
  });

  router.delete('/:deviceId', async (req, res) => {
    const { orgId, deviceId } = req.params;

    let device = await devices.deleteOne({ _orgId: orgId, _id: deviceId });

    res.send(device);
  });

  router.post('/', async (req, res) => {
    const { name } = req.body;
    const { orgId } = req.params;

    let device = new devices({ name: name, _orgId: orgId });

    password = crypto.randomBytes(16).toString('hex');
    salt = crypto.randomBytes(16).toString('hex');

    device.auth.salt = salt;
    device.auth.username = crypto.randomBytes(16).toString('hex');
    device.auth.password = crypto.createHmac('sha512', salt).update(password).digest('hex');

    device.save();

    res.send({ _id: device._id, name: device.name, auth: { username: device.auth.username, password: password } });
  });

  router.patch('/:deviceId', async (req, res) => {
    const { name } = req.body;
    const { orgId, deviceId } = req.params;

    let device = await devices.findOne({ _orgId: orgId, _id: deviceId });

    device.name = name;
    device.save();

    res.send(device);
  });
}

module.exports = routes;
