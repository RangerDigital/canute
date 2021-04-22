const express = require('express');
const router = express.Router({ mergeParams: true });

const mqtt = require('../mqtt');
const devices = require('../models/devices');

router.get('/', async (req, res) => {
  let errors = false;
  let response = {};

  if (mqtt.connected() === true) {
    response['mqtt'] = 'connected';
  } else {
    response['mqtt'] = 'error';
    errors = true;
  }

  try {
    await devices.findOne();
    response['mongo'] = 'connected';
  } catch {
    response['mongo'] = 'error';
    errors = true;
  }

  if (errors) {
    return res.status(500).json(response);
  }

  return res.json(response);
});

module.exports = router;
