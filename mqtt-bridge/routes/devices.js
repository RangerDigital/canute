const express = require('express');
const router = express.Router({ mergeParams: true });

const devices = require('../models/devices');

// Endpoint for MQTT Broker
router.post('/auth', async (req, res) => {
  const { username, password } = req.body;

  if (username == process.env.MQTT_USERNAME && password == process.env.MQTT_PASSWORD) {
    return res.json({ msg: 'Access Granted!' });
  }

  let device = await devices.findOne({ 'auth.username': username, 'auth.password': password });

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

  let topicLevels = topic.split('/');

  let device = await devices.findOne({ _id: client });

  if (device && client == topicLevels[1]) {
    return res.json({ msg: 'Access Granted!' });
  }

  return res.status(403).json({ msg: 'Access Denied!' });
});

module.exports = router;
