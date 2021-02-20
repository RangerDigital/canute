const express = require('express');
const router = express.Router({ mergeParams: true });
const asyncHandler = require('express-async-handler');

const checkAuth = require('../middleware/checkAuth');
const checkOrg = require('../middleware/checkOrg');
const devices = require('../models/devices');

router.get(
  '/',
  checkAuth,
  checkOrg(),
  asyncHandler(async (req, res) => {
    const { orgId } = req.params;

    let deviceArray = await devices.find({ _orgId: orgId });

    let shadows = [];

    for (let device of deviceArray) {
      for (let shadow of device.shadows) {
        // Check if users have a role with permission to this shadow.
        if (req.org.roles.filter((x) => x.permissions.includes(shadow._id) && x.users.includes(req.user._id))) {
          shadows.push(shadow);
        }
      }
    }

    res.json(shadows);
  })
);

module.exports = router;
