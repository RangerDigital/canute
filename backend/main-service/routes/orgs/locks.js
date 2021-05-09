const ShadowService = require('../../services/orgs/ShadowService');

async function routes(router) {
  router.register(require('../../hooks/orgHook'));

  router.get('/', async (req, res) => {
    const { orgId } = req.params;

    const locks = await ShadowService.getLocks(orgId, req.user._id);

    res.send(locks);
  });

  router.post('/:lockId', async (req, res) => {
    const { orgId, lockId } = req.params;

    const { success, lock } = await ShadowService.engageLock(orgId, lockId, req.user._id);

    if (success) {
      return res.send(lock);
    }

    return res.code(403).send({ msg: 'Permissions not sufficient for this operation!' });
  });
}

module.exports = routes;
