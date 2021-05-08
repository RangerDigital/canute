const devices = require('../../models/devices');

async function routes(router) {
  router.register(require('../../hooks/adminHook'));

  router.get('/', async (req, res) => {
    const { orgId } = req.params;

    let deviceArray = await devices.find({ _orgId: orgId });

    let shadows = [];

    for (let device of deviceArray) {
      for (let shadow of device.shadows) {
        shadows.push(shadow);
      }
    }

    res.send(shadows);
  });
}

module.exports = routes;
