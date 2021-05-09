const DeviceService = require('../../services/orgs/DeviceService');

async function routes(router) {
  router.register(require('../../hooks/adminHook'));

  router.get('/', async (req, res) => {
    const { orgId } = req.params;

    let devices = await DeviceService.get(orgId);

    res.send(devices);
  });

  router.get('/:deviceId', async (req, res) => {
    const { orgId, deviceId } = req.params;

    let device = await DeviceService.getOne(orgId, deviceId);

    res.send(device);
  });

  router.delete('/:deviceId', async (req, res) => {
    const { orgId, deviceId } = req.params;

    await DeviceService.deleteOne(orgId, deviceId);

    res.code(204).send('');
  });

  router.post('/', async (req, res) => {
    const { name } = req.body;
    const { orgId } = req.params;

    let device = await DeviceService.create(orgId, name);

    res.send(device);
  });

  router.patch('/:deviceId', async (req, res) => {
    const { name } = req.body;
    const { orgId, deviceId } = req.params;

    let device = await DeviceService.updateName(orgId, deviceId, name);

    res.send(device);
  });
}

module.exports = routes;
