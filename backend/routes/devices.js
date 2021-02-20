const express = require('express');
const router = express.Router({ mergeParams: true });
const asyncHandler = require('express-async-handler');

const crypto = require('crypto');

const authUser = require('../middleware/authUser');

const isOrgAdmin = require('../middleware/isOrgAdmin');
const devices = require('../models/devices');

router.get(
  '/',
  authUser,
  isOrgAdmin,
  asyncHandler(async (req, res) => {
    const { orgId } = req.params;

    let device = await devices.find({ _orgId: orgId });

    res.json(device);
  })
);

router.post(
  '/',
  authUser,
  isOrgAdmin,
  asyncHandler(async (req, res) => {
    const { name } = req.body;
    const { orgId } = req.params;

    let device = new devices({ name: name, _orgId: orgId });

    device.auth.clientId = String(device._id);
    device.auth.clientToken = crypto.randomBytes(16).toString('hex');
    device.acl.pubsub.push('things/' + device.auth.clientId + '/#');

    device.shadows.push({ name: 'Example Switch', topis: 'things/' + device.auth.clientId + '/relay/0', reported: 'on', type: 'switch' });

    device.save();

    res.json(device);
  })
);

module.exports = router;
