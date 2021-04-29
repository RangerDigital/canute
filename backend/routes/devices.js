const express = require('express');
const router = express.Router({ mergeParams: true });

const crypto = require('crypto');

const checkAuth = require('../middleware/checkAuth');

const checkOrg = require('../middleware/checkOrg');
const devices = require('../models/devices');

router.get('/', checkAuth, checkOrg(true), async (req, res) => {
  const { orgId } = req.params;

  let device = await devices.find({ _orgId: orgId });

  res.json(device);
});

router.get('/:deviceId', checkAuth, checkOrg(true), async (req, res) => {
  const { orgId, deviceId } = req.params;

  let device = await devices.findOne({ _orgId: orgId, _id: deviceId });

  res.json(device);
});

router.delete('/:deviceId', checkAuth, checkOrg(true), async (req, res) => {
  const { orgId, deviceId } = req.params;

  let device = await devices.deleteOne({ _orgId: orgId, _id: deviceId });

  res.json(device);
});

router.post('/', checkAuth, checkOrg(true), async (req, res) => {
  const { name } = req.body;
  const { orgId } = req.params;

  let device = new devices({ name: name, _orgId: orgId });

  password = crypto.randomBytes(16).toString('hex');
  salt = crypto.randomBytes(16).toString('hex');

  device.auth.salt = salt;
  device.auth.username = crypto.randomBytes(16).toString('hex');
  device.auth.password = crypto.createHmac('sha512', salt).update(password).digest('hex');

  device.save();

  res.json({ _id: device._id, name: device.name, auth: { username: device.auth.username, password: password } });
});

router.patch('/:deviceId', checkAuth, checkOrg(true), async (req, res) => {
  const { name } = req.body;
  const { orgId, deviceId } = req.params;

  let device = await devices.findOne({ _orgId: orgId, _id: deviceId });

  device.name = name;
  device.save();

  res.json(device);
});

module.exports = router;
