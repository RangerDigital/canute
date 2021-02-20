const express = require('express');
const router = express.Router({ mergeParams: true });
const asyncHandler = require('express-async-handler');

const authUser = require('../middleware/authUser');
const devices = require('../models/devices');

router.get(
  '/',
  authUser,
  asyncHandler(async (req, res) => {
    const { orgId } = req.params;

    let device = await devices.find({ _orgId: orgId });

    res.json(device.shadows);
  })
);

module.exports = router;
