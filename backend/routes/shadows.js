const express = require('express');
const router = express.Router({ mergeParams: true });
const asyncHandler = require('express-async-handler');

const checkAuth = require('../middleware/checkAuth');
const devices = require('../models/devices');

router.get(
  '/',
  checkAuth,
  asyncHandler(async (req, res) => {
    const { orgId } = req.params;

    let deviceArray = await devices.find({ _orgId: orgId });

    let shadows = [];

    for (let device of deviceArray) {
      for (let shadow of device.shadows) {
        // TODO: Check if user has permission to this shadow.

        shadows.push(shadow);
      }
    }

    res.json(shadows);
  })
);

module.exports = router;
