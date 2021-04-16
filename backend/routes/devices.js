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

router.post('/', checkAuth, checkOrg(true), async (req, res) => {
  const { name } = req.body;
  const { orgId } = req.params;

  let device = new devices({ name: name, _orgId: orgId });

  device.auth.clientId = crypto.randomBytes(16).toString('hex');
  device.auth.clientToken = crypto.randomBytes(32).toString('hex');

  device.save();

  res.json(device);
});

// Endpoint for MQTT Broker
router.post('/auth', async (req, res) => {
  const { client, password } = req.body;

  let device = await devices.findOne({ 'auth.clientId': client, 'auth.clientToken': password });

  if (device) {
    return res.json({ msg: 'Access Granted!' });
  }

  return res.status(403).json({ msg: 'Access Denied!' });
});

router.post('/acl', async (req, res) => {
  const { client, topic } = req.body;

  let levels = topic.split('/');

  let device = await devices.findOne({ 'auth.clientId': client, 'auth.clientId': levels[1] });

  if (device && client == levels[1]) {
    return res.json({ msg: 'Access Granted!' });
  }

  return res.status(403).json({ msg: 'Access Denied!' });
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
