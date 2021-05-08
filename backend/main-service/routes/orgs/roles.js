const orgs = require('../../models/orgs');

async function routes(router) {
  router.register(require('../../hooks/adminHook'));

  router.get('/', async (req, res) => {
    res.send(req.org.roles);
  });

  router.get('/:roleId', async (req, res) => {
    const { roleId } = req.params;

    let role = req.org.roles.filter((x) => String(x._id) == String(roleId));

    res.send(role[0]);
  });

  router.post('/', async (req, res) => {
    const { name, permissions, users } = req.body;
    let organisation = req.org;

    organisation.roles.push({ name: name, permissions: permissions, users: users });

    await organisation.validate().catch((err) => {
      return res.code(400).send({ msg: err });
    });

    organisation.save();

    res.send(organisation.roles);
  });

  router.patch('/:roleId', async (req, res) => {
    const { name, permissions } = req.body;
    const { orgId, roleId } = req.params;

    let roles = await orgs.updateOne({ _id: orgId, 'roles._id': roleId }, { $set: { 'roles.$.name': name, 'roles.$.permissions': permissions } });

    res.send(roles);
  });

  router.post('/:roleId/users/:userId', async (req, res) => {
    const { roleId, userId } = req.params;

    let organisation = req.org;

    // Check if userId is in organisation

    if (organisation.roles.find((x) => x._id == roleId).users.includes(userId)) {
      res.send(organisation.roles);
      return;
    }
    organisation.roles.find((x) => x._id == roleId).users.push(userId);

    organisation.save();

    res.send(organisation.roles);
  });

  router.delete('/:roleId/users/:userId', async (req, res) => {
    const { roleId, userId } = req.params;

    let organisation = req.org;

    organisation.roles.find((x) => x._id == roleId).users.pull(userId);

    organisation.save();

    res.send(organisation);
  });

  router.delete('/:roleId', async (req, res) => {
    const { orgId, roleId } = req.params;

    let organisation = await orgs.findOne({ _id: orgId, 'roles._id': roleId });

    organisation.roles = organisation.roles.filter((x) => String(x._id) !== String(roleId));

    organisation.save();

    res.send(organisation.roles);
  });
}

module.exports = routes;
