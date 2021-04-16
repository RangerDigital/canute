const express = require('express');
const router = express.Router({ mergeParams: true });

const checkAuth = require('../middleware/checkAuth');
const checkOrg = require('../middleware/checkOrg');

const orgs = require('../models/orgs');

router.get('/', checkAuth, checkOrg(true), async (req, res) => {
  res.json(req.org.roles);
});

router.get('/:roleId', checkAuth, checkOrg(true), async (req, res) => {
  const { roleId } = req.params;

  let role = req.org.roles.filter((x) => String(x._id) == String(roleId));

  res.json(role[0]);
});

router.post('/', checkAuth, checkOrg(true), async (req, res) => {
  const { name, permissions, users } = req.body;
  let organisation = req.org;

  organisation.roles.push({ name: name, permissions: permissions, users: users });

  await organisation.validate().catch((err) => {
    return res.status(400).json({ msg: err });
  });

  organisation.save();

  res.json(organisation.roles);
});

router.patch('/:roleId', checkAuth, checkOrg(true), async (req, res) => {
  const { name, permissions } = req.body;
  const { orgId, roleId } = req.params;

  let roles = await orgs.updateOne({ _id: orgId, 'roles._id': roleId }, { $set: { 'roles.$.name': name, 'roles.$.permissions': permissions } });

  res.json(roles);
});

router.post('/:roleId/users/:userId', checkAuth, checkOrg(true), async (req, res) => {
  const { roleId, userId } = req.params;

  let organisation = req.org;

  // Check if userId is in organisation

  if (organisation.roles.find((x) => x._id == roleId).users.includes(userId)) {
    res.json(organisation.roles);
    return;
  }
  organisation.roles.find((x) => x._id == roleId).users.push(userId);

  organisation.save();

  res.json(organisation.roles);
});

router.delete('/:roleId/users/:userId', checkAuth, checkOrg(true), async (req, res) => {
  const { roleId, userId } = req.params;

  let organisation = req.org;

  organisation.roles.find((x) => x._id == roleId).users.pull(userId);

  organisation.save();

  res.json(organisation);
});

router.delete('/:roleId', checkAuth, checkOrg(true), async (req, res) => {
  const { orgId, roleId } = req.params;

  let organisation = await orgs.findOne({ _id: orgId, 'roles._id': roleId });

  organisation.roles = organisation.roles.filter((x) => String(x._id) !== String(roleId));

  organisation.save();

  res.json(organisation.roles);
});

module.exports = router;
