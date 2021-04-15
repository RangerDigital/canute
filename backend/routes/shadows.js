const express = require('express');
const router = express.Router({ mergeParams: true });

const checkAuth = require('../middleware/checkAuth');
const checkOrg = require('../middleware/checkOrg');
const devices = require('../models/devices');

router.get('/', checkAuth, checkOrg(true), async (req, res) => {
  const { orgId } = req.params;

  let deviceArray = await devices.find({ _orgId: orgId });

  let shadows = [];

  for (let device of deviceArray) {
    for (let shadow of device.shadows) {
      shadows.push(shadow);
    }
  }

  res.json(shadows);
});

module.exports = router;
