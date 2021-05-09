const ShadowService = require('../../services/ShadowService');

async function routes(router) {
  router.register(require('../../hooks/adminHook'));

  router.get('/', async (req, res) => {
    const { orgId } = req.params;

    const shadows = await ShadowService.get(orgId);

    res.send(shadows);
  });
}

module.exports = routes;
