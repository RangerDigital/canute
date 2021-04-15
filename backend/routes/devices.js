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

router.post('/', checkAuth, checkOrg(true), async (req, res) => {
  const { name } = req.body;
  const { orgId } = req.params;

  let device = new devices({ name: name, _orgId: orgId });

  device.auth.clientId = String(device._id);
  device.auth.clientToken = crypto.randomBytes(16).toString('hex');
  device.acl.pubsub.push('things/' + device.auth.clientId + '/#');

  device.save();

  res.json(device);
});

router.patch('/:deviceId', checkAuth, checkOrg(true), async (req, res) => {
  const { name } = req.body;
  const { orgId, deviceId } = req.params;

  let device = await devices.find({ _orgId: orgId, _id: deviceId });

  device.name = name;
  device.save();

  res.json(device);
});

module.exports = router;
