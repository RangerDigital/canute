const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');
const checkOrg = require('../middleware/checkOrg');

const orgs = require('../models/orgs');
const users = require('../models/users');

router.get('/', checkAuth, async (req, res) => {
  let organisations = await orgs.find({ 'users._userId': req.userId }).select('_id name');

  res.json(organisations);
});

router.post('/', checkAuth, async (req, res) => {
  const { name } = req.body;

  let organisation = new orgs({ name: name, users: [{ _userId: req.userId, isAdmin: true }] });
  organisation.save();

  res.json(organisation);
});

router.get('/:orgId', checkAuth, checkOrg(true), async (req, res) => {
  const organisation = req.org;

  res.json(organisation);
});

router.patch('/:orgId', checkAuth, checkOrg(true), async (req, res) => {
  const { name } = req.body;
  const organisation = req.org;

  organisation.name = name;
  organisation.save();

  res.json(organisation);
});

router.get('/:orgId/users', checkAuth, checkOrg(true), async (req, res) => {
  const { orgId } = req.params;

  let users = await orgs.findOne({ _id: orgId, users: { $elemMatch: { _userId: req.userId, isAdmin: true } } }).populate('users.user', '-_id -__v');
  res.json(users.users);
});

router.post('/:orgId/users', checkAuth, checkOrg(true), async (req, res) => {
  const { email, notes, isAdmin } = req.body;

  let organisation = req.org;
  let user = await users.findOne({ email: email });

  if (!user) {
    user = new users({ email: email });
    user.save();
  }

  organisation.users.push({ _userId: user._id, isAdmin: isAdmin, notes: notes });

  await organisation.validate().catch((err) => {
    return res.status(400).json({ msg: err });
  });

  organisation.save();

  res.json(organisation);
});

router.delete('/:orgId/users/:userId', checkAuth, checkOrg(true), async (req, res) => {
  const { userId } = req.params;

  let organisation = req.org;

  organisation.users = organisation.users.filter((x) => String(x._id) !== String(userId));
  organisation.save();

  res.json(organisation);
});

const devices = require('./devices');
router.use('/:orgId/devices', devices);

const shadows = require('./shadows');
router.use('/:orgId/shadows', shadows);

const roles = require('./roles');
router.use('/:orgId/roles', roles);

module.exports = router;
