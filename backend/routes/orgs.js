const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');
const checkOrg = require('../middleware/checkOrg');

const orgs = require('../models/orgs');
const users = require('../models/users');

router.get('/', checkAuth, async (req, res) => {
  // let organisations = await orgs.find({ 'users._userId': req.userId }).select('_id name address');
  let organisations = await orgs.find({ 'users._userId': req.userId });

  let response = [];

  // Check if a logged user is an admin in this organisation.
  for (let organisation of organisations) {
    let isAdmin = false;
    for (let user of organisation.users) {
      if (user._userId == req.userId && user.isAdmin == true) {
        isAdmin = true;
      }
    }

    // Filter out unnecessary fields.
    response.push({ _id: organisation._id, name: organisation.name, address: organisation.address, isAdmin: isAdmin });
  }

  res.json(response);
});

router.post('/', checkAuth, async (req, res) => {
  const { name, address } = req.body;

  let organisation = new orgs({ name: name, address: address, users: [{ _userId: req.userId, isAdmin: true }] });
  organisation.save();

  res.json(organisation);
});

router.get('/:orgId', checkAuth, checkOrg(true), async (req, res) => {
  const organisation = req.org;

  res.json(organisation);
});

router.patch('/:orgId', checkAuth, checkOrg(true), async (req, res) => {
  const { name, address } = req.body;
  const organisation = req.org;

  // TODO! It's not PATCH anymore
  organisation.name = name;
  organisation.address = address;

  organisation.save();

  res.json(organisation);
});

router.get('/:orgId/users', checkAuth, checkOrg(true), async (req, res) => {
  const { orgId } = req.params;

  let users = await orgs.findOne({ _id: orgId, users: { $elemMatch: { _userId: req.userId, isAdmin: true } } }).populate('users.user', '-_id -__v -auth');
  let response = [];

  // Add roles to users for this partculat organisation.
  // Need for Users frontend view.
  for (let user of users.users.toObject()) {
    let roles = [];

    for (let role of req.org.roles) {
      if (role.users.includes(user._id)) {
        roles.push({ _id: role._id, name: role.name, permissions: role.permissions });
      }
    }

    user = user;
    user.roles = roles;
    user.email = user.user.email;

    delete user.user;
    response.push(user);
  }

  res.json(response);
});

router.get('/:orgId/users/:userId', checkAuth, checkOrg(true), async (req, res) => {
  const { orgId, userId } = req.params;

  let users = await orgs.findOne({ _id: orgId, users: { $elemMatch: { _userId: req.userId, isAdmin: true } } }).populate('users.user', '-_id -__v -auth');
  let response = [];

  // Add roles to users for this partculat organisation.
  // Need for Users frontend view.
  for (let user of users.users.toObject()) {
    let roles = [];

    for (let role of req.org.roles) {
      if (role.users.includes(user._id)) {
        roles.push({ _id: role._id, name: role.name, permissions: role.permissions });
      }
    }

    user = user;
    user.roles = roles;
    user.email = user.user.email;

    delete user.user;

    response.push(user);
  }

  response = response.filter((x) => String(x._id) == String(userId));

  res.json(response[0]);
});

router.patch('/:orgId/users/:userId', checkAuth, checkOrg(true), async (req, res) => {
  const { orgId, userId } = req.params;
  const { annotation, isAdmin } = req.body;

  let users = await orgs.updateOne({ _id: orgId, 'users._id': userId }, { $set: { 'users.$.annotation': annotation, 'users.$.isAdmin': isAdmin } });

  res.json(users);
});

router.post('/:orgId/users', checkAuth, checkOrg(true), async (req, res) => {
  const { email, annotation, isAdmin } = req.body;

  let organisation = req.org;
  let user = await users.findOne({ email: email });

  if (!user) {
    user = new users({ email: email });
    user.save();
  }

  organisation.users.push({ _userId: user._id, isAdmin: isAdmin, annotation: annotation });

  await organisation.validate().catch((err) => {
    return res.status(400).json({ msg: err });
  });

  organisation.save();

  res.json(organisation.users[organisation.users.length - 1]);
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

const locks = require('./locks');
router.use('/:orgId/locks', locks);

const roles = require('./roles');
router.use('/:orgId/roles', roles);

module.exports = router;
