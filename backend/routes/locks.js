const express = require('express');
const router = express.Router({ mergeParams: true });

const catcher = require('../catcher');

const checkAuth = require('../middleware/checkAuth');
const checkOrg = require('../middleware/checkOrg');
const devices = require('../models/devices');

router.get('/', checkAuth, checkOrg(), async (req, res) => {
  const { orgId } = req.params;

  let deviceArray = await devices.find({ _orgId: orgId });

  let locks = [];

  for (let device of deviceArray) {
    for (let shadow of device.shadows) {
      // Check if users have a role with permission to this shadow.

      if (req.org.roles.filter((x) => x.permissions.includes(shadow._id) && x.users.includes(req.user._id)).length) {
        // Check if shadow class == lock.
        if (shadow.class === 'lock') {
          locks.push(shadow);
        }
      }
    }
  }

  res.json(locks);
});

router.post('/:lockId', checkAuth, checkOrg(), async (req, res) => {
  const { lockId } = req.params;

  let device = await devices.findOne({ 'shadows._id': lockId });

  let lock = device.shadows.filter((x) => x._id == lockId && x.class == 'lock')[0];

  if (req.org.roles.filter((x) => x.permissions.includes(lock._id) && x.users.includes(req.user._id)).length) {
    catcher.publish(lock.topic, '{"desired": "engaged"}');

    return res.json(lock);
  }

  return res.status(403).json({ msg: 'Permissions not sufficient for this operation!' });
});

module.exports = router;
