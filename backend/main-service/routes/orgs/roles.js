const RoleService = require('../../services/orgs/RoleService');

async function routes(router) {
  router.register(require('../../hooks/adminHook'));

  router.get('/', async (req, res) => {
    const { orgId } = req.params;

    const roles = await RoleService.get(orgId);

    console.log(roles);

    res.send(roles);
  });

  router.get('/:roleId', async (req, res) => {
    const { orgId, roleId } = req.params;

    const role = await RoleService.getOne(orgId, roleId);

    res.send(role);
  });

  router.post('/', async (req, res) => {
    const { name, permissions, users } = req.body;
    const { orgId } = req.params;

    const role = await RoleService.create(orgId, name, permissions, users);

    return res.send(role);
  });

  router.patch('/:roleId', async (req, res) => {
    const { name, permissions } = req.body;
    const { orgId, roleId } = req.params;

    const role = await RoleService.update(orgId, roleId, name, permissions);

    return res.send(role);
  });

  router.delete('/:roleId', async (req, res) => {
    const { orgId, roleId } = req.params;

    const roles = await RoleService.delete(orgId, roleId);

    return res.send(roles);
  });

  router.post('/:roleId/users/:userId', async (req, res) => {
    const { orgId, roleId, userId } = req.params;

    const roles = await RoleService.addUser(orgId, roleId, userId);

    return res.send(roles);
  });

  router.delete('/:roleId/users/:userId', async (req, res) => {
    const { orgId, roleId, userId } = req.params;

    const roles = await RoleService.deleteUser(orgId, roleId, userId);

    return res.send(roles);
  });
}

module.exports = routes;
