const OrgService = require('../../services/OrgService');

async function routes(router) {
  router.register(require('../../hooks/adminHook'));

  router.get('/:orgId', async (req, res) => {
    const { orgId } = req.params;

    const organisation = await OrgService.getOne(orgId);
    res.send(organisation);
  });

  router.patch('/:orgId', async (req, res) => {
    const { name, address } = req.body;
    const { orgId } = req.params;

    const organisation = await OrgService.updateOne(orgId, name, address);
    return res.send(organisation);
  });
}

module.exports = routes;
