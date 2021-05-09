const OrgService = require('../../services/OrgService');

async function routes(router) {
  router.register(require('../../hooks/adminHook'));

  router.get('/', async (req, res) => {
    const { orgId } = req.params;

    const roles = await OrgService.getRoles(orgId);

    console.log(roles);

    res.send(roles);
  });

  router.get('/:roleId', async (req, res) => {
    const { orgId, roleId } = req.params;

    const role = await OrgService.getOneRole(orgId, roleId);

    res.send(role);
  });

  router.post('/', async (req, res) => {
    const { name, permissions, users } = req.body;
    const { orgId } = req.params;

    const role = await OrgService.addRole(orgId, name, permissions, users);

    return res.send(role);
  });

  router.patch('/:roleId', async (req, res) => {
    const { name, permissions } = req.body;
    const { orgId, roleId } = req.params;

    const role = await OrgService.updateRole(orgId, roleId, name, permissions);

    return res.send(role);
  });

  router.post('/:roleId/users/:userId', async (req, res) => {
    const { orgId, roleId, userId } = req.params;

    const roles = await OrgService.addUserToRole(orgId, roleId, userId);

    return res.send(roles);
  });

  router.delete('/:roleId/users/:userId', async (req, res) => {
    const { orgId, roleId, userId } = req.params;

    const roles = await OrgService.deleteUserFromRole(orgId, roleId, userId);

    return res.send(roles);
  });

  router.delete('/:roleId', async (req, res) => {
    const { orgId, roleId } = req.params;

    const roles = await OrgService.deleteRole(orgId, roleId);

    return res.send(roles);
  });
}

module.exports = routes;
