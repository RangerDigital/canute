const express = require('express');
const router = express.Router({ mergeParams: true });

const devices = require('../models/devices');

// Endpoint for MQTT Broker
router.post('/auth', async (req, res) => {
  const { client, username, password } = req.body;

  let device = await devices.findOne({ 'auth.clientId': client, 'auth.clientToken': password });

  if (device) {
    return res.json({ msg: 'Access Granted!' });
  }

  return res.status(403).json({ msg: 'Access Denied!' });
});

router.post('/super', async (req, res) => {
  const { username, password } = req.body;

  if (username == process.env.MQTT_USERNAME && password == process.env.MQTT_PASSWORD) {
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

module.exports = router;
